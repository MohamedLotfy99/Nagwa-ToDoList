# <img src="./nagwaLogo.png" width="70" style="vertical-align: middle; margin-right: 5px;" alt="nagwa"> Nagwa Todo List App

This project is my implementation of the **To-Do List task assigned by Nagwa**. It features a full-stack setup with user authentication, persistent data storage, and a responsive UI built with React and TailwindCSS.

---

## ⚠️ Setup Instructions ⚠️

To run the app locally:

1. **Extract the ZIP file**  
   You will find two folders inside:

   - `Client-Side`
   - `Server-Side`

2. **Open VSCode** in the extracted directory (where both folders exist).

3. **Start the server:**

   Open a new terminal in VSCode and run:

   ```bash
   cd .\Server-Side\
   npm install
   npm run dev
   ```

   👇 is an example of how your terminal should look like (Remember to add `npm install` after `cd .\Server-Side\`)

   ![Server-Side-Terminal](/server-terminal.png)

4. **Start the client:**

   Open a new terminal in VSCode and run:

   ```bash
   cd .\Client-Side\
   npm install
   npm run dev
   ```

   👇 is an example of how your terminal should look like (Remember to add `npm install` after `cd .\Client-Side\`)

   ![Client-Side-Terminal](/client-terminal.png)

5. **Access the app**

   After starting both the server and client, You can open it by either:

   - Holding `Alt` and clicking the link shown in the terminal, **or**
   - Manually opening your browser and navigating to:  
     [http://localhost:5173/](http://localhost:5173/)

## 🕹️ Hotkeys for Task Management

In the **To-Do List** page, you can use the following keyboard shortcuts to manage your tasks efficiently:

- **`Alt + N`**: Create a new task.  
  (Opens a new input field to add a task to the list.)

  - **Note**: The task originally asked to use `Ctrl + N` for creating a task. However, since `Ctrl + N` is a reserved shortcut for opening a new browser window, I replaced it with `Alt + N` to avoid conflicts.

- **`Arrow Down`**: Navigate to the next task in the list.  
  (Moves the selection down the list of tasks.)

- **`Arrow Up`**: Navigate to the previous task in the list.  
  (Moves the selection up the list of tasks.)

- **`Space`**: Mark the selected task as completed or uncompleted.  
  (Toggles the completion state of the selected task.)

- **`Delete`**: Delete the selected task.  
  (Removes the selected task from the list.)

- **`Alt + E`**: Edit the selected task.  
  (Focuses on the input field for editing the selected task. If already in edit mode, it blurs the field.)
  - **Note**: The task originally asked to use `E` for editing a task, but to avoid conflicts with toggling and typing and allow `E` to be typed inside tasks, I replaced it with `Alt + E`.
