# QuickSight Custom Parameter Display

This project provides a simple webpage that displays URL parameters, particularly for use with Amazon QuickSight custom visuals. The webpage is hosted on S3 and served through CloudFront.

## Features

- **Displays QuickSight parameters**: Dynamically displays URL parameters passed by QuickSight.
- **Flexible Layouts**: Supports different layout options such as pills, new rows, or table format.
- **Customizable Appearance**: Customize pill colors and layouts via URL parameters.
- **Responsive Design**: Adapts to various screen sizes for optimal viewing on different devices.

## Prerequisites

- **Node.js**: Version 14.x or later
- **AWS Account**: With permissions to create S3 buckets and CloudFront distributions
- **AWS CDK**: Install the AWS CDK if you plan to deploy using CDK.

  ```shell
  npm install -g aws-cdk
  ```

- **AWS CLI**: Ensure you have the AWS CLI installed and configured with appropriate permissions.

## Quick Start

1. **Clone the repository**:

   ```shell
   git clone https://github.com/yeahthisisrob/quicksight-custom-parameter-display.git
   cd quicksight-custom-parameter-display
   ```

2. **Install dependencies**:

   ```shell
   npm install
   ```

3. **Build the project**:

   ```shell
   npm run build
   ```

4. **Deploy the stack**:

   ```shell
   cd cdk
   npm install
   cdk bootstrap
   cdk deploy
   ```

5. **Get the CloudFront URL**:

   After deployment, the CloudFront URL will be output. Use this URL to access the webpage.

## Usage

After deployment, you can use the CloudFront URL with various parameters to customize the display:

```
https://your-cloudfront-url.cloudfront.net/?param1=value1&param2=value2,value3&pillColor=ff5733&maxItemCount=5&layout=wrap
```

### URL Parameters

- **Custom Parameters**: Any parameters you pass in the URL will be displayed on the webpage.
- `pillColor`: Specify a color name or hex code for the pills (e.g., `pink`, `ff5733`).
- `maxItemCount`: Limit the number of items displayed per parameter (e.g., `5`).
- `layout`: Set to `wrap` to wrap parameters on the same line, `newrow` for each on a new line, or `table` to display parameters in a table format.

## Using with Amazon QuickSight

You can integrate this webpage with Amazon QuickSight to display parameters in your dashboards using custom visual content.

### Steps to Add Custom Visual Content in QuickSight

1. **Open Your Dashboard in QuickSight**:

   Navigate to the QuickSight dashboard where you want to add the custom visual.

2. **Add a Custom Visual**:

   - Click on the **`Add`** button and select **`Add visual`**.
   - In the visual types pane, select **`Custom visual content`**.

3. **Configure the Custom Visual**:

   - In the **Visual type** options, select **`Web page`**.
   - In the **URL** field, enter the CloudFront URL of your deployed webpage.

4. **Pass Parameters to the URL**:

   - Click on the **parameter icon** (⚙️) next to the URL box.
   - Insert your parameters using the syntax `ParameterName=<<$Parameter>>`.
     - For example: `https://your-cloudfront-url.cloudfront.net/?filter=<<$FilterParameter>>&layout=table`

### Example

If you have a QuickSight parameter named `RegionParam`, you can pass it to the webpage like this:

- In the URL field, enter:

  ```
  https://your-cloudfront-url.cloudfront.net/?region=<<$RegionParam>>
  ```

- The webpage will display the value of `RegionParam`.

## Cleanup

To avoid ongoing costs, you can delete the stack when it is no longer needed:

- **Using CDK**:

  ```shell
  cdk destroy
  ```

- **Using CloudFormation**:

  - Go to the CloudFormation Console, select the stack, and click **`Delete Stack`**.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.