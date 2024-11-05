# File Handling Application

## Requirements:-

1. Develop a Node.js application that monitors an input folder for new files every 5 minutes.
2. Every File found in the input folder should be converted/split into multiple chunks based on size (These chunks would be of 10mb) and stored in an output folder using Linux commands within the Node Application.
3. If a file is already processed, it should not be processed again.
4. As soon as the conversion is done, Application should compare the original file and the chunks to check if any data is lost during the conversion and print the output.

## Getting Started

1. **Configure Settings**:
   - Set the desired chunk size in MB.
   - Define the time interval to monitor the input folder.

2. **Run the Application**:
   - Use the command below to start the application:
     ```bash
     npm run start
     ```

## How It Works

- The app scans the input folder for files, including any files within nested folders.
- Each file is divided into chunks using a custom `splitFile` function with Linux Commands.
- Chunked files are saved in the output folder.
- A `processed.json` file is generated to log and track all processed files.
  
### Validation
The application verifies that the total size of all chunked files matches the original file size, ensuring accuracy.

