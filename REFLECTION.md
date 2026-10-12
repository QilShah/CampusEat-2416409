# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
- Imperative code spells out the steps to change the DOM (create, append, update). Declarative code (React) describes what the UI should look like for the current state, and React handles the DOM updates

2. Why must a component name start with a capital letter?
- JSX treats lowercase tags as built-in HTML elements (<div>) and capitalized ones as your own components (<Components>)

3. What does a fragment <>...</> do, and why not just use a <div>?
- <>...</> groups multiple elements under one root without adding an extra DOM node, unlike a <div>, which can clutter markup or break layouts (e.g., inside tables or lists).

4. Name one benefit of splitting the UI into small components.
- Reusability. Write a piece of UI once and use it anywhere
