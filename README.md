# @fakehost

A collection of resources for UI development. Fake out your REST, and WebSocket services, 
control them from your tests (Jest, Vitest, Playwright, Cypress) to provide deep level of testing, including edge-cases, reconnection, error throwing. 

Bundle your fake services as part of storybook, or a demo app. 

Build the ui against a fake version of the real api, while a backend developer builds the real service.

Use contract tests to ensure your fakes matches, and continues to match the real remote service. 


- `@fakehost/fake-rest`: fake out rest calls to a remote service. 
- `@fakehost/exchange`: base package for running a websocket based node service, or bunding within a browser for demos.
- `@fakehost/fake-signalr`: a fully aligned fake signalr WebSocket service. Add your own service implementation and control it from your tests. 



