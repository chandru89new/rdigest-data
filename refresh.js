#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");

let html = `<html>

<head>
    <title>Digest</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-weight: 400;
            font-family:
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Roboto,
                Oxygen,
                Ubuntu,
                Cantarell,
                "Open Sans",
                "Helvetica Neue",
                sans-serif;
            font-size: 16px;
        }

        body {
            font-size: 1rem;
            padding: 1rem;
        }

        p {
            margin-bottom: 0.5rem;
        }

        h1 {
            margin-bottom: 2rem;
            font-weight: bold;
        }

        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-top: 2rem;
            margin-bottom: 0.5rem;
        }



        pre#app {
            display: none;
        }
    </style>
</head>

<body>
    <pre id="app">{{content}}</pre>
    <div id="render"></div>
    <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
    <script>
        let pre = document.getElementById('app')
        let render = document.getElementById('render')
        let md = pre.innerText?.split("\\n").filter(t => t !== "\\n").map(t => t.trim()).join("\\n\\n");
        render.innerHTML = marked.parse(md);
    </script>
</body>

</html>`;

const main = async () => {
  let c = execSync("./rdigest digest 2", {
    encoding: "utf-8"
  });
  c = html.replace("{{content}}", c);
  fs.writeFileSync("./index.html", c);
  console.log("Done!");
};

main();
