"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("articles", [
      {
        id: "14089f71-cf43-4aa0-8a19-d7b95ea3a45f",
        user_id: "b253d5fd-8f59-4ab8-9e72-f515f9b91303",
        title: "ARTICLE NEW",
        banner:
          "uploads/article/1623908344375-720351306 - Screen Shot 2021-06-13 at 11.39.14.png",
        is_premium: false,
        content: `
        Open a new request tab by clicking the plus (+) button at the end of the tabs.
        Change the http request method to "GET" with the dropdown selector on the left of the URL input field.
        In the URL field enter the address to the users route of your local API - http://localhost:4000/users/1/refresh-tokens.
        Select the "Authorization" tab below the URL field, change the type to "Bearer Token" in the type dropdown selector, and paste the JWT token from the previous authenticate (or refresh token) step into the "Token" field.
        Click the "Send" button, you should receive a "200 OK" response containing a JSON array with all the test user's refresh tokens. Make a copy of the last token value (the active token) because we'll use it in the next step to revoke the token.
        `,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "14089a21-cf43-4aa0-8a19-d7b97ea3a45f",
        user_id: "b253d5fd-8f59-4ab8-9e72-f515f9b91303",
        title: "INDONESIA TERTAWA",
        banner:
          "uploads/article/1623908344375-720351306 - Screen Shot 2021-06-13 at 11.39.14.png",
        is_premium: false,
        content: `
        Open a new request tab by clicking the plus (+) button at the end of the tabs.
        Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
        In the URL field enter the address to the authenticate route of your local API - http://localhost:4000/users/revoke-token.
        Select the "Authorization" tab below the URL field, change the type to "Bearer Token" in the type dropdown selector, and paste the JWT token from the previous authenticate (or refresh token) step into the "Token" field.
        Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON".`,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("articles", null, {});
  },
};
