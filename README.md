<div align="center">
  <img src="README_Header.png" alt="Give Me The Butter Icon" width="50%">
</div>

# Tutorial: Build a Generative AI Text Summarization Application Using React, AWS, and Anthropic Claude 3 - Sonnet

This tutorial will guide you through the process of building a text summarization application called Give Me The Butter (عطني الزبده).
We will be using React (and Vanilla JavaScript if you prefer) for the frontend, AWS for the backend infrastructure, and Anthropic's Claude 3 - Sonnet.

## Prerequisites

This tutorial will go over all steps in detail. However, it is prefered if you have the following:

- Basic knowledge of Javascript or React
- An AWS account
- Access to Anthropic's Claude 3 - Sonnet model through Amazon Bedrock

## What We Will Be Building

The application we'll build consists of a frontend (either React or Vanilla JavaScript) where users can input text, and a backend serverless architecture on AWS that handles the text summarization logic using Claude 3 - Sonnet accessed through Amazon Bedrock. Here's a high-level overview of the components:

- Frontend: A simple user interface where users can input text and view the generated summary. There are two versions available:
  - GMTB-React-App folder: A Full React application
  - GMTB-VanillaJS-App folder: A simple bare-bones JavaScript application (for those who prefer not to use React)
- Amazon Bedrock: A fully managed service to access foundation models.
- AWS Lambda Function: A serverless function that receives the user's text input, sends it to the Claude 3 - Sonnet model via Amazon Bedrock, and returns the generated summary.
- AWS API Gateway: An API Gateway that acts as the entry point for the frontend to invoke the Lambda function.

## Steps

The tutorial is divided into the following steps:

1. Requesting access to Anthropic Claude 3 - Sonnet
2. Building the Lambda Function
3. Deploying the API
4. Integrating the API with the application

Each step is explained in detail, with code snippets and screenshots to guide you through the process.

## Getting Started

To get started, simply follow the step-by-step instructions in the tutorial. Choose the appropriate frontend folder (GMTB-React-App or GMTB-VanillaJS-App) based on your preference.

Happy coding!

## Disclaimers and Potential Improvements

Please note that this tutorial is intended for learning purposes only, and the application built here is a basic example. In a production environment, you would need to consider additional factors, such as:

- **Prompt Injection**: The current implementation may be vulnerable to prompt injection attacks, where malicious users could inject their own prompts into the text summarization process. To mitigate this risk, you should implement proper input validation and sanitization mechanisms.
- **Performance and Scalability**: As the number of users and requests increase, you may need to optimize the application's performance and scalability by implementing techniques like caching, load balancing, and auto-scaling.
- **Security and Access Control**: Depending on your use case, you may need to implement authentication and access control mechanisms to secure your application.
- **Monitoring and Logging**: Implementing robust monitoring and logging mechanisms can help you detect and troubleshoot issues more effectively.
- **Error Handling and Retries**: Improving error handling and implementing retry mechanisms can enhance the application's reliability and resilience.

This list is not exhaustive, and there may be other areas for improvement depending on your specific requirements and constraints.
