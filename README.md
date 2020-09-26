# create-frontend-app

```
> yarn create-project
```

**Why using `src/pages` instead of `src/views`?**\
For better semantics - a page can include many views, for exaple multistep checkout form. Each step is then defined as a separate view.
