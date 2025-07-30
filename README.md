# Muzz Code Test Solution

This is my solution to the Muzz Frontend Engineering Test

## Process / Decisions

I will be documenting my process and decisions as I work through this test. Hopefully this should explain my approach to the problem. I'm going to focus on making improvements to the codebase before starting on any of the feature and testing work.

### 1. Getting the site running and building

I didn't have much trouble getting the site running in dev mode, although there seemed to be some issues with the backend code which were preventing me from running it out of the box. It was only a couple of typescript issues which needed resolving though.

There were also a couple of small linting issues preventing the site from building which I resolved as well.

### 2. Basic performance analysis

Before diving into the code I was keen to check a few things first.

- Play around with the React DevTools profiler to see whether there are any rendering performance issues
- Run a lighthouse test
- Run a bundle analysis

As expected, given the small size of the app, there were no glaring issues. In a real life scenario with a bigger app this would definitely be my first move though. I did notice when using the profiler that page interactions where triggering uneccessary full page rerenders.

### 3. Familiarise with the codebase

Before making any changes I spent some time familiarising with the codebase and identifying areas where the structure could be improved and where the code could made more modular and scalable. Key areas I picked up on were as follows.

- No code formatting library in use
- No commit hooks
- Relative imports
- Shared components all in single folder
- "Pages" and "Features" co-located. Confusing features boundaries and logic.
- Using a store to manage page/route state.
- Store actions not seperated from state.
- No use of middleware or persistence in the stores.
- Query client being created _within_ the render resulting in it being recreated on every render.
- Lots of arbitrary tailwind values in place (especially for colors) instead of tailwind config extension.
- Conditional tailwind classes being managed with ternaries.
- All page interactions seem to result in full page rerender
- "@typescript-eslint/no-explicit-any": "off" 😂 + various type safety issues.
- Copy baked into components

At this point I figured there was probably more to be found but that I had plenty to work on. I decided to prioritise the fixes based on how simple the improvement was vs how much value it'd provided. Gotta get the low hanging fruit!

### 4. Add import alias

I am aware that there is debate around whether aliasing is actually best practice or not. I'm not going to write an essay on it, but ultimately I think it looks tidier and makes it harder to run into import path issues. I updated the tsconfig and vite config to support the alias and then used copilot to update the paths around the codebase.

Without any tests in place I had no way to programatically check that I hadn't broken anything. At this point I considered whether it was worth writing some baseline tests to enable this, but actually decided against it as the out of the box functionality is so basic that it only takes a couple of seconds to check that the app is running fine manually.

I wasn't totally sure at this point exactly how many changes I'd have time to make and so didn't want to risk writing tests and then having to rewrite after reworking things.

If this were a larger scale project I would **absolutely** consider boulstering the test infrastructure as a top priority **before** making significant structural changes to the codebase.

### 5. Code formatter

Another low hanging fruit. A code formatter ensures code consistency and readability as the project scales. It is opinionated, which removes the decision making time from formatting decisions.

I installed prettier, configured it in the package.json and also added the eslint plugin to ensure that there are no conflicting rules. I ran the formatter on all files to make sure that existing code was made consistent.

### 6. Pre-commit hooks

I decided to quickly setup some husky pre-commit hooks to run linting and code formatting upon commit. This ensures that a developer can't accidentally commit unformatted code if they don't have their IDE configured correctly to highlight and fix linting/formatting issues.

### 7. Some styling tweaks

I added a [util](/frontend/src/utils/cn.ts) to help with conditional tailwind classes. It also uses [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) to avoid any conflicts if multiple classes affecting the same style are applied. It's only being used twice in the code at this stage, and with very minimal conditions. When the codebase begins to scale and components become more complex the original approach for conditional classes would become awkward to manage.

Another library to consider as the pool of shared components increases is the [cva](https://cva.style/docs) library. I didn't implement it in this case as there are no components with variants, but it's incredibly useful for defining alternative styles for components that have lots of variants.

I also created a couple of new colour variables in the global styles and applied those in the code. I found quite a lot of other arbitrary sizing classes around the codebase e.g. w-[8px]. For ones divisible by eight I switched out for the ootb tailwind classes. I left any non-divisble by eight as they were as I didn't want to tweak existing styles.

Typically if you're using tailwind with the out of the box config and 4px grid you'll want your designs to align with that. It's fine to use arbitrary values occasionally for one off scenarios, but they are very messy.

### 8. Shared components folder structure

Whilst fine early in the project, having all shared components sitting under one folder could become confusing and difficult to manage in time. I added another layer of categorisation to the folder to break it up a little.

For shared components I usually look to the well established component libraries for folder structure inspiration. In this case I ripped off the categorisation that [MUI](https://mui.com/material-ui/all-components/) uses. e.g. inputs, feedback, layout, data display, navigation etc.

### 9. ESLint config

I re-enabled the `@typescript-eslint/no-explicit-any` rule and added a couple more linting plugins for better code quality. I never ever like using `any` unless I have literally no other choice.

- jsx-a11y: Highlight issues related to accessibility
- sonarjs: This is spots code smells, security issues, performance issues etc.
- vitest: This'll be handy soon when there are actually tests!
- testing-library: Same for this one. Linting rules unique to react testing library

I also wanted to add the tailwind eslint plugin but realised that they don't have stable support for tailwind v4, which is installed on the project so I opted not to.

### 10. Make `Button` component more generic

The Button component was using an `any` type and so I decided to fix that up along with the ESLint changes. The component is basically just a wrapper for an ootb HTML element so I decided to just extend the default html element props. This gives the component much more flexibility to be used in different scenarios without having to continually tweak the component.

I also added a forwardRef so that a ref can be passed to the inner button element.

### 11. Start setting up testing

This seemed like an appropriate moment to start setting up the testing infrastructure. I installed and configured Vitest and setup a [test-utils](/frontend/src/testing/test-utils.tsx) file with a helper function for rendering components. There is a README covering that in the testing folder. Vitest can form the backbone for unit and component testing on the site.

I added tests for the existing shared components, but left the 'features' as is.

Coverage is configured so you could begin to track code coverage as a metric. In a real project I would consider setting up some sort of quality gate that prevents the merging of branches into the codebase which do not meet a high enough coverage percentage.

### 12. Extract features from routes

This was a fairly big chunk of refactoring I wanted to do to make the project more scalable and maintainable. I seperated out code in the pages folder into a features folder instead. The folder structure follows the [bulletproof react](https://github.com/alan2207/bulletproof-react) structure.

For now there are two features; chat and user-management. Each folder is broken down into subfolders to cover different functionality.

```
src/features/new-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

This approach keeps all ui/logic related to a feature in a single location, rather than hidden within the pages folder. It creates a layer between the stores and the components by introducing hooks which expose actions related to any given feature. It also introduces a network layer in the API folder.

The UI has been broken down into smaller pieces. Making each component easier to digest, test and maintain.

### 13. Move query client into state

React Query client should be initialised in state, else it's recreated on each render of the root component. This results in uneccessary refetches!

### 14. Add a router

I found the global state based router pattern a little confusing. It's not a pattern I'm familiar with and on the surface it seems that there'd be a lot of downsides, particularly in relation to scalability.

The obvious downside is that you lose all the benefits of having a url based route; being able to share links to part of the app, being able to use the history api, search params etc. Even if this was being opened in a web view in an app you would still get these benefits.

I made the assumption that we would likely want to continue adding more pages to this app, on so decided to swap out this approach for a simple react-router implementation instead. Whilst doing this I also tidied up the structure of the src folder a bit and broke out the root component a bit.

Doing this did introduce a bug where you can navigate directly to the chat page and get a broken screen because the current participant isn't selected. I think the correct solution to that problem would be to actually track the current recipient as a dynamic path e.g. pass the user id in the url. I'm going to push on for now though as I'm running short on time.

### 15. Add tests for features

This seemed like an appropriate moment to add tests for the features. I used AI to help out with these a little bit. The mocking approach for the stores and api is a bit brute force. With more time I would typically use MSW for mocking the API layer. The Zustand docs also have some good content on setting up tests using stores.

### 16. Get the chat working

I wanted to implement the sockets out of the box rather than doing it store only at first. For the sake of speed I relied on AI for a lot of the boilerplate stuff including the backend side of things.

### 17. Improved chat styling

I spent some time tidying up the styles a bit and implementing the logic for timestamps and chat bubble grouping.
