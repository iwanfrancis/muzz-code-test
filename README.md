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

At this point I figured there was probably more to be found but that I had plenty to work on. I decided to prioritise the fixes based on how simple the improvement was vs how much value it'd provided. Gotta get the low hanging fruit!

### 4. Add import alias

I am aware that there is debate around whether aliasing is actually best practice or not. I'm not going to write an essay on it, but ultimately I think it looks tidier and makes it harder to run into import path issues. I updated the tsconfig and vite config to support the alias and then used copilot to update the paths around the codebase.

Without any tests in place I had no way to programatically check that I hadn't broken anything. At this point I considered whether it was worth writing some baseline tests to enable this, but actually decided against it as the out of the box functionality is so basic that it only takes a couple of seconds to check that the app is running fine manually.

I wasn't totally sure at this point exactly how many changes I'd have time to make and so didn't want to risk writing tests and then having to rewrite after reworking things.

If this were a larger scale project I would **absolutely** consider boulstering the test infrastructure as a top priority **before** making significant structural changes to the codebase.

### 5. Code formatter

Another low hanging fruit. A code formatter ensures code consistency and readability as the project scales. It is opinionated, which removes the decision making time from formatting decisions.

I installed prettier, configured it in the package.json and also added the eslint plugin to ensure that there are no conflicting rules. I ran the formatter on all files to make sure that existing code was made consistent.
