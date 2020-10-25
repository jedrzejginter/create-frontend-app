<div align="center">
  <h1>create-react-project</h1>
  <p>CLI tool for creating React project ready to develop</p>

  **create-react-project**\
  <img src="https://github.com/jedrzejginter/create-react-project/workflows/main/badge.svg">
</div>

---

## Usage

```bash
> node build/cli.js init -d out -n my-new-app
```

### Heroku deployment

After you run this step you have to add a **HEROKU_AUTH_TOKEN** secret to your repo.

```.bash
> node build/cli.js with-heroku-deploy -d out --app my-heroku-app
```

### Tailwind support

```.bash
> node build/cli.js with-tailwind -d out
```
