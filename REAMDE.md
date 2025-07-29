# Muzz Code Test Solution

This is my solution to the Muzz Frontend Engineering Test

## Process / Decisions

I will be documenting my process and decisions as I work through this test. Hopefully this should explain my approach to the problem.

### 1. Getting the site running and building

I didn't have much trouble getting the site running in dev mode, although there seemed to be some issues with the backend code which were preventing me from running it out of the box. It was only a couple of typescript issues which needed resolving though.

There were also a couple of small linting issues preventing the site from building which I resolved as well.

### 2. Basic performance analysis

Before diving into the code and making any changes I was keen to check a few things first.

- Play around with the React DevTools profiler to see whether there are any rendering performance issues
- Run a lighthouse test
- Run a bundle analysis

As expected, given the small size of the app, there were no glaring issues. In a real life scenario with a bigger app this would definitely be my first move though.
