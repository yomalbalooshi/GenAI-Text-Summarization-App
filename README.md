<div align="center">
  <img src="public/README_Header.png" alt="Give Me The Butter Icon" width="50%">
</div>

# Tutorial: Build a Generative AI Text Summarization Application Using React, AWS, and Anthropic's Claude 3 - Sonnet

Welcome to the "Give Me The Butter" (عطني الزبده) tutorial! This guide will walk you through creating a powerful text summarization tool that leverages Anthropic's Large Language Model. Perfect for developers looking to expand their skills in React, AWS, and Generative AI.

## Introduction

"Give Me The Butter" is a GenAI powered text summarization application. It's designed to help users quickly extract the key points from large blocks of text, saving time and improving comprehension.

Estimated completion time: 2-3 hours

**NOTE: The same steps could be applied for Anthropic Claude 3.5 - Sonnet**

## Prerequisites

This tutorial is designed to be beginner-friendly, but familiarity with the following will be helpful:

- Basic knowledge of Javascript or React
  - [React Tutorial for Beginners](https://react.dev/learn)
  - [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- An AWS account
  - [Create an AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- Access to Anthropic Claude 3 - Sonnet model through Amazon Bedrock
  - We'll cover how to request access in this tutorial

Note: This tutorial may incur some costs through AWS. Please review the [AWS Pricing](https://aws.amazon.com/pricing/) page and [Anthropic's API Pricing](https://www.anthropic.com/pricing#anthropic-api) for more information.

## What We Will Be Building

<<<<<<< HEAD
![Preview of React application](public/Demo.gif 'Preview of React application')
=======
![alt gif](./Demo.gif 'Preview of React application')
>>>>>>> 02802b51e8ccc554c854ef2a66cd1989c6e97669

The application we'll build consists of a frontend (either React or Vanilla JavaScript) where users can input text, and a backend serverless architecture on AWS that handles the text summarization logic using Claude 3 - Sonnet accessed through Amazon Bedrock. Here's a high-level overview of the components:

- Frontend: A simple user interface where users can input text and view the generated summary. There are two versions available:
  - GMTB-React-App folder: A Full React application
  - GMTB-VanillaJS-App folder: A simple bare-bones JavaScript application (for those who prefer not to use React)
- Amazon Bedrock: A fully managed service to access foundation models.
- AWS Lambda Function: A serverless function that receives the user's text input, sends it to the Claude 3 - Sonnet model via Amazon Bedrock, and returns the generated summary.
- AWS API Gateway: Serves as the bridge between the frontend and our Lambda function.

## What We Will Be Using

<ul>
<li><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB " alt="React"></li>
<li><img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS"></li>
<li><img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" alt="Python" ></li>
<li><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" ></li>
<li><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Javascript" ></li>
<li><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white " alt="HTML" ></li>
<li><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" ></li>
</ul>

## Getting Started

To get started, simply **fork and clone** this repo and follow the step-by-step instructions in the tutorial.

Happy coding!

<details>
  <summary>Steps</summary>
  The tutorial is divided into the following steps:
  <ol>
    <li><a href="#1-requesting-access-to-anthropics-claude-3---sonnet">Requesting access to Anthropic's Claude 3 - Sonnet</a></li>
    <li><a href="#2-building-the-lambda-function">Building the Lambda Function</a></li>
    <li><a href="#3-deploying-the-api">Deploying the API</a></li>
    <li><a href="#4-integrating-the-api-with-the-application">Integrating the API with the application</a></li>
  </ol>
  Each step is explained in detail, with code snippets and screenshots to guide you through the process.

</details>
<br />

### 1. Requesting access to Anthropic's Claude 3 - Sonnet

Follow these steps to request access to the Claude 3 - Sonnet model through Amazon Bedrock:

1. **Access AWS Console**:

   - Go to the [AWS Console](https://aws.amazon.com/)
   - Log in to your account or register if you don't have one

2. **Navigate to Amazon Bedrock**:

   - In the AWS Console menu bar, search for "Amazon Bedrock"

3. **Access Model Settings**:

   - Open the Bedrock side menu
   - Scroll down and click on "Model Access"

4. **Initiate Model Access Modification**:
   - Under "What is Model access?", click on "Modify model access"

![Modify model access](public/Bedrock/1-selectmodel.png 'Modify model access')

5. **Select the Model**:
   - Choose "Anthropic Claude 3 Sonnet" from the list
   - Click "Next"

![Select Anthropic Claude 3 Sonnet](public/Bedrock/2-selectmodelaccess.png 'Select Anthropic Claude 3 Sonnet')

6. **Submit Access Request**:
   - Review the request details
   - Click "Submit"

![Submit the request](public/Bedrock/3-submitmodelaccess.png 'Submit the request')

7. **Await Approval**:
   - Your request will be reviewed by AWS
   - You'll be notified once access is granted

Note: The approval process may take some time. You can proceed with the next steps of setting up your environment while waiting for approval.

### 2. Building the Lambda Function

#### We'll start by creating the function and granting it Bedrock access permissions.

1. In the AWS Management Console, search for "Lambda" in the menu bar

2. Open the Lambda side menu and click "Functions"

3. Click "Create function"

![Create function](public/Lambda/1-createfunction.png 'Create function')

4. Name your function and set the runtime to Python 3.12, then click "Create function"

![Configure function](public/Lambda/2-createfunctionmenu.png 'Configure function')

5. In your new function's page, go to "Configuration" > "Permissions". Click on the function's role to open the IAM dashboard.

![Add permissions](public/Lambda/3-functionconfiguration.png 'Add permissions')

6. Under "Permissions" select "Add permissions > Attach policies" and search for "AmazonBedrockFullAccess".

7. Select the policy and click "Add permissions"

![permissions](public/Lambda/4-addpermissions.png 'permissions')

#### Now that our Lambda function has the necessary permissions, let's write the code.

1. First, we'll import the required packages and create a boto3 client:

```python
import json
import boto3

client = boto3.client('bedrock-runtime')
```

2. Next, we'll define the lambda handler function and create a system prompt to guide the model:

```python
import json
import boto3

client = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
        system_prompt = "I will give you some text. Please summarize it.
```

3. For this project, we'll utilize the newer [Messages API](https://docs.anthropic.com/en/api/messages) rather than the [Legacy Text Completions API](https://docs.anthropic.com/en/api/complete). Our request body will include inference parameters, a system prompt, and the user's message. It's important to note that each base model has unique inference parameters. To learn more about the specific inference parameters for Anthropic models, check out the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html).

```python
import json
import boto3

client = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
  system_prompt = "I will give you some text. Please summarize it.

  request_body=json.dumps(
    {
      "anthropic_version": "bedrock-2023-05-31",
      "max_tokens":1000,
      "temperature": 0.5,
      "system":system_prompt,
      "messages": [
        {
          "role": "user",
          "content": [{"type": "text", "text": event['prompt']}]
        },
      ],
    }
  )
```

4. Finally, we'll send our request to the model using Bedrock's invoke_model() method:

```python
import json
import boto3

client = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
  system_prompt = "I will give you some text. Please summarize it.

  request_body=json.dumps(
    {
      "anthropic_version": "bedrock-2023-05-31",
      "max_tokens":1000,
      "temperature": 0.5,
      "system":system_prompt,
      "messages": [
        {
          "role": "user",
          "content": [{"type": "text", "text": event['prompt']}]
        },
      ],
    }
  )
  try:
        response = client.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=request_body
        )

        response_body = json.loads(response["body"].read())
        return response_body["content"][0]['text']

  except Exception as e:
    print(f"Error: {e}")
    return "Could not summarize the text."

```

If you're using a different Anthropic model, find its corresponding Model ID in the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html#model-ids-arns) and replace it in the code above

#### Enhancing our prompt

1. To make parsing easier in the frontend, let's instruct the model to return the summary in \<summary>\</summary> tags:

```python
import json
import boto3
client = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
  system_prompt = "You are given some text. Summarize it and output the summary within <summary></summary> tags. If it cannot be summarized, return it as it is within <summary></summary> tags. ONLY reply with the <summary></summary> tags and nothing else."
    request_body=json.dumps(
                {
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens":1000,
                    "temperature": 0.5,
                    "system":system_prompt,
                    "messages": [
                        {
                            "role": "user",
                            "content": [{"type": "text", "text": event['prompt']}],
                        }
                    ],
                }
            )
    try:
        response = client.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=request_body
        )

        response_body = json.loads(response["body"].read())
        return response_body["content"][0]['text']

    except Exception as e:
        print(f"Error: {e}")
        return "Could not summarize the text."
```

2. To improve consistency, we can use 3-shot inferencing. We'll provide the model with sample articles and their summaries as examples:

```python
import json
import boto3
client = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    example1="<example><text>{PUT YOUR SAMPLE TEXT HERE}</text><summary>{PUT THE SUMMARY OF YOUR SAMPLE TEXT HERE}</summary></example>"
    example2="<example><text>{PUT YOUR SAMPLE TEXT HERE}</text><summary>{PUT THE SUMMARY OF YOUR SAMPLE TEXT HERE}</summary></example>"
    example3="<example><text>{PUT YOUR SAMPLE TEXT HERE}</text><summary>{PUT THE SUMMARY OF YOUR SAMPLE TEXT HERE}</summary></example>"

    system_prompt = "You are given some text. Summarize it and output the summary within <summary></summary> tags. If it cannot be summarized, return it as it is within <summary></summary> tags. ONLY reply with the <summary></summary> tags and nothing else. Here are some examples:"+ example1 + example2 + example3

    request_body=json.dumps(
                {
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens":1000,
                    "temperature": 0.5,
                    "system":system_prompt,
                    "messages": [
                        {
                            "role": "user",
                            "content": [{"type": "text", "text": event['prompt']}],
                        }
                    ],
                }
            )
    try:
        response = client.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=request_body
        )

        response_body = json.loads(response["body"].read())
        return response_body["content"][0]['text']

    except Exception as e:
        print(f"Error: {e}")
        return "Could not summarize the text."

```

Remember to replace the placeholders in the examples with actual sample texts and their summaries. You can use the [cnn_dailymail dataset](https://huggingface.co/datasets/abisee/cnn_dailymail) from Hugging Face as a source for these examples.
Test your Lambda function with a piece of text. If you're not happy with the model's response, try adjusting the system prompt.

### 3. Deploying the API

Now we'll deploy an API using API Gateway to access our Lambda function.

1. In the AWS Management Console menu bar, search for "API Gateway"

2. Navigate to APIs in the side panel and click "Create API"

![Create API](public/API-Gateway/1-createapimenu.png 'Create API')

3. Choose "REST API"

![REST API](public/API-Gateway/2-selectapitype.png 'REST API')

4. Select "New API", give it a name, and choose "Regional" for the API Endpoint Type

![Create API](public/API-Gateway/3-nameapi.png 'Create API')

5. After API creation, select it and click "Create resource". Name it and enable CORS

![Create Resource](public/API-Gateway/4-createresource.png 'Create Resource')

6. Select your new resource and click "Create Method"

![Select create Method](public/API-Gateway/5-createmethod.png 'Select create Method')

7. Configure the method:
   - Method type: POST
   - Integration type: Lambda function
   - Select the Lambda function we created earlier

![Create Method](public/API-Gateway/6-methodconfiguration.png 'Create Method')

8. Under "Method Request Settings", select "API Key Required" and submit

![Require API Key](public/API-Gateway/7-methodconfiguration2.png 'Require API Key')

9. Click on the resource again and select "Enable CORS"

![Select Enable CORS](public/API-Gateway/8-enablecors.png 'Select Enable CORS')

10. Enable CORS for the POST method we created

![Enable CORS](public/API-Gateway/9-corsconfigurations.png 'Enable CORS')

11. Click "Deploy API", create a new stage (e.g., "dev"), and deploy your API to that stage

![Deploy to stage](public/API-Gateway/10-deployAPI.png 'Deploy to stage')

12. In the side panel, go to API Keys and click "Create API Key"

![Create API Key](public/API-Gateway/11-createapikey.png 'Create API Key')

13. Name your API Key and choose auto-generate or custom. We'll use auto-generate here

![API Key Configurations](public/API-Gateway/12-apikeyconfigurations.png 'API Key Configurations')

14. In the side panel, go to "Usage Plans" and click "Create Usage Plan"

![Create Usage Plan](public/API-Gateway/13-createusageplan.png 'Create Usage Plan')

15. Configure your usage plan. For example, set a limit of 50 requests per day per user. Adjust as needed for your testing

![Usage Plan Configurations](public/API-Gateway/14-usageplanconfigurations.png 'Usage Plan Configurations')

16. In your new usage plan, go to "Associated Stages" and click "Add API Stage"

![Add stage](public/API-Gateway/15-associatestage.png 'Add stage')

17. Select the stage where we deployed our API and add it to the usage plan

![Add stage](public/API-Gateway/16-selectstage.png 'Add stage')

18. In the usage plan, go to "Associated API Keys" and click "Add API Key"

![Add key](public/API-Gateway/17-associatekey.png 'Add key')

19. Select the API key we created and add it to the usage plan

![Add key](public/API-Gateway/18-addapikey.png 'Add key')

20. To test the API locally, we'll use the invoke URL. Find this by going to Stages in the side panel, selecting your stage, resource, and POST method. Copy the invoke URL

![Invoke URL](public/API-Gateway/19-urltoinvoke.png 'Invoke URL')

21. We'll use [Insomnia](https://insomnia.rest) to test our API, but you can use any similar platform. Set up your request:

- Use the invoke URL
- Send a JSON request body:

```json
{
  "prompt": "Text goes here"
}
```

- Add your API Key to the request headers
- Send the request and wait for the model's response

![API Response](public/API-Gateway/20-apicall.png 'API Response')

![Request Headers](public/API-Gateway/21-invokeconfigs.png 'Request Headers')

You should now have a working API that connects to your Lambda function and interacts with the Bedrock model!

### 4. Integrating the API with the application

This repository contains two application options:

1. GMTB-React-App: A ready-to-use React application
2. GMTB-VanillaJS-App: A basic web application using vanilla JavaScript

Choose the application you prefer and navigate to its folder.

  <ol>
    <li><a href="#integrating-with-the-react-application">Integrate with the React Application</a></li>
    <li><a href="#integrating-with-the-vanilla-javascript-application">Integrate with the Vanilla Javascript Application</a></li>
  </ol>
<br />

#### Integrating with the React Application

**Application Structure**:

![React Application Structure](public/Component_Hierarchy_gmtb.png 'React Application Structure')

The application works as follows:

- Users input text in the MessageInputBox component
- Clicking the button in this component sends a request to the API
- The MessageResult component shows a loading screen while waiting for a response
- Once received, the response updates the messageInputResult variable
- The SummaryTextBox component (within MessageResult) displays the response

Steps to set up:

1.  **Install packages**:

- Open a terminal in the GMTB-React-App folder
- Run: `npm install`

2.  **Run the application**:

- Start the app with: `npm run dev`
- Open your browser to the provided localhost URL

3. **Create a .env file**:
   - In the terminal, run: `touch .env`

Your folder structure should now look like this:

![Folder Structure](public/Application/1-Folderstructure.png 'Folder Structure')

5. **Configure API settings**:

   - Open the .env file in your code editor
   - Add the following (replace with your actual values, no quotes or spaces):
     ```
     VITE_API_BASE_URL=YOUR_URL_GOES_HERE
     VITE_API_ACCESS_KEY=YOUR_KEY_GOES_HERE
     ```
   - Save the file

6. **Test the Integration**:
   - Restart the application if it was running
   - In your browser, enter some text and click the button
   - Wait for the API response

Here's what you should see:

![Preview of React application](public/Demo.gif 'Preview of React application')

#### Integrating with the Vanilla Javascript Application

1.  **Run the application**:

- In the GMTB-VanillaJS-App folder, open index.html with your browser
- You'll see a basic HTML page with a text box and a button

2. **Configure API settings**:

   - Open index.html in your code editor
   - Find the `callAPI()` function inside the `<script></script>` tags
   - Replace the placeholder values for `apiUrl` and `apiKey` with your actual API URL and API Key

3. **Test the Application**:
   - Save your changes to index.html
   - Refresh the page in your browser
   - Enter some text and click the button
   - Wait a few seconds for the API response to display

**Note: This setup is for learning purposes only. Do not use it in a production environment without proper security measures.**

## Disclaimers and Potential Improvements

This tutorial is designed for educational purposes and presents a basic implementation. For a production environment, consider the following improvements:

### Security Considerations

#### Prompt Injection Prevention

The current implementation may be vulnerable to prompt injection attacks. Implement robust input validation and sanitization to mitigate this risk.

- Learn more: [Best practices to avoid prompt injection attacks](https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/best-practices.html)

#### Service Permissions

Apply the principle of least privilege, granting only necessary permissions to services.

- Resource: [AWS Least Privilege Permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege)

#### Access Control

Implement authentication and authorization mechanisms appropriate for your use case.

- Guide: [AWS API Gateway Authorization](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html)

### Performance and Scalability

Optimize for increased usage by implementing:

- Load balancing
- Auto-scaling

Reference: [Performance efficiency](https://docs.aws.amazon.com/en_us/wellarchitected/2022-03-31/framework/performance-efficiency.html)

### Monitoring and Logging

Implement comprehensive monitoring and logging for effective issue detection and troubleshooting.

- Tool: [AWS CloudWatch](https://aws.amazon.com/cloudwatch/)

### Error Handling and Resilience

Enhance reliability through improved error handling and retry mechanisms.

- Best Practices: [AWS Resilience Hub](https://aws.amazon.com/resilience-hub/)

### Cost Optimization

Consider strategies to optimize costs in a production environment.

- Guide: [AWS Cost Optimization](https://aws.amazon.com/architecture/cost-optimization/)

### Legal and Ethical Considerations

Be aware of potential legal and ethical implications when using AI for text summarization, such as copyright concerns and bias in AI-generated content.

This list is not exhaustive. Always consider your specific requirements, constraints, and the latest best practices when moving to a production environment.
