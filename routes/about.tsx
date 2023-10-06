import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { handler as jokeHandler } from "./api/joke.ts";
import { useState } from "preact/hooks";
import Counter from "../islands/Counter.tsx";
import { signal } from "@preact/signals";
type Joke = string;
const count = signal(5);
export const handler: Handlers = {
  async GET(req, ctx) {
    // const jokeUrl = new URL(req.url).origin + "/api/joke";
    // const joke: Joke = await fetch(jokeUrl).then((res) => res.text());
    const jskeRes = jokeHandler(req, ctx);
    const joke: Joke = await jskeRes.text();
    return ctx.render(joke);
  },
};

export default function About({ data }: PageProps<Joke>) {
  const [num, setNum] = useState(0);

  return (
    <div>
      <h1>about page</h1>
      <p>{data}</p>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>+1</button>
      <Counter count={signal(1)} />
    </div>
  );
}
