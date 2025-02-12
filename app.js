import { Application, Router } from "https://deno.land/x/oak@v6.3.2/mod.ts";

const app = new Application();
const router = new Router();

const hello = ({response}) => {
  response.body = 'Hello world!';
}

router.get('/', hello);
app.use(router.routes());

export { app };