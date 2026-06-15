# TaskMaster - To-Do List Application

A beautiful, feature-rich to-do list application with local storage functionality. Complete your tasks and stay organized!

## ✨ Features

### Core Features
- ✅ **Add Tasks** - Simple and quick task creation
- ✅ **Mark Complete** - Check off completed tasks
- ✅ **Delete Tasks** - Remove tasks you no longer need
- ✅ **Edit Tasks** - Modify task details anytime
- ✅ **Local Storage** - Tasks persist across browser sessions

### Advanced Features
- 📋 **Advanced Task Creation** - Add priority, category, due date, and description
- 🎯 **Priorities** - Set task importance (High, Medium, Low)
- 📂 **Categories** - Organize tasks by category (Work, Personal, Shopping, Health, Other)
- 📅 **Due Dates** - Set deadlines for your tasks
- 📝 **Descriptions** - Add detailed notes to tasks
- 🔍 **Filtering** - View All, Pending, Completed, or High Priority tasks
- 📊 **Statistics** - Real-time tracking of total, completed, and pending tasks

### Additional Features
- 💾 **Export Tasks** - Download tasks as JSON backup
- 🗑️ **Clear Completed** - Bulk remove all completed tasks
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⌨️ **Keyboard Support** - Press Enter to add tasks
- 🚀 **Instant Sync** - Changes saved immediately to local storage

## 🚀 Getting Started

### Access the Application
1. Open the application in your browser:
   ```
   http://localhost/taskmaster.html
   ```

2. Or if running the banking app, navigate to the TaskMaster link from the navigation

## 📖 How to Use

### Adding a Quick Task
1. Type your task in the input field at the top
2. Click the "+" button or press Enter
3. Your task appears at the top of the list

### Adding an Advanced Task
1. Click "Add Advanced" button at the bottom
2. Fill in the task details:
   - **Title**: What you need to do
   - **Description**: More details (optional)
   - **Priority**: Low, Medium, or High
   - **Category**: Work, Personal, Shopping, Health, or Other
   - **Due Date**: When it's due (optional)
3. Click "Create Task"

### Managing Tasks
- **Complete a Task**: Click the checkbox next to the task
- **Edit a Task**: Click the edit icon (pencil)
- **Delete a Task**: Click the delete icon (trash)
- **Filter Tasks**: Use the filter buttons to show All, Pending, Completed, or High Priority tasks

### Bulk Actions
- **Clear Completed**: Remove all completed tasks at once
- **Export Tasks**: Download your tasks as a JSON file for backup

## 🎯 Filtering Options

| Filter | Shows |
|--------|-------|
| **All** | Every task you've created |
| **Pending** | Tasks not yet completed |
| **Completed** | Finished tasks |
| **High Priority** | Only high-priority tasks |

## 💾 Local Storage Details

Your tasks are automatically saved to your browser's local storage:
- **Storage Type**: Browser LocalStorage
- **Data Format**: JSON
- **Auto-Save**: Every action is saved instantly
- **Persistence**: Tasks remain even after closing and reopening your browser
- **Capacity**: Up to 5-10MB per domain (depending on browser)

### Export Your Data
To backup your tasks:
1. Click "Export" button at the bottom
2. A JSON file downloads with all your tasks
3. Keep it safe as a backup

### Access Saved Data
You can also access your saved data manually:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Find the `tasks` entry
4. Your tasks are stored as JSON

## 🎨 Task Display Elements

### Priority Badges
- 🔴 **High** - Red badge (urgent tasks)
- 🟠 **Medium** - Orange badge (standard tasks)
- 🟢 **Low** - Green badge (low urgency)

### Categories
- **Work** - Blue badge
- **Personal** - Default style
- **Shopping** - Same style
- **Health** - Same style
- **Other** - Default category

### Metadata
- Created date (auto-added)
- Due date (if specified)
- Priority level (if set)
- Category (if set)

## 📊 Dashboard Stats

The header shows real-time statistics:
- **Total Tasks**: All tasks created
- **Completed**: Finished tasks
- **Pending**: Tasks remaining

Stats update instantly when you add, complete, or delete tasks.

## 🎓 Tips & Tricks

1. **Keyboard Shortcut**: Press Enter in the input field to quickly add a task
2. **Hover Effects**: Hover over tasks to see options highlighted
3. **Completed Styling**: Completed tasks fade and show strikethrough text
4. **Date Sorting**: Tasks created earlier appear after newer ones
5. **Category Filtering**: Use categories to organize work, personal, and shopping tasks
6. **Priority Levels**: Use high priority to focus on urgent items
7. **Backup Regularly**: Export your tasks weekly as backup

## 🔒 Data Privacy

- ✅ All data stored locally on your device
- ✅ No server uploads or cloud sync
- ✅ No tracking or analytics
- ✅ Completely private and secure
- ✅ Can be deleted anytime by clearing browser storage

## 🛠️ Technical Details

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: Browser LocalStorage API
- **Data Format**: JSON
- **Styling**: CSS3 with gradients and animations
- **Icons**: Font Awesome 6.4.0

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- **Load Time**: < 100ms
- **Storage Access**: Instant
- **Rendering**: Smooth animations
- **Memory**: Minimal overhead

## 📱 Mobile Features

- Responsive design adapts to any screen size
- Touch-friendly buttons and inputs
- Swipe-to-scroll task list
- Mobile-optimized modals
- Easy keyboard input

## 🐛 Troubleshooting

### Tasks Not Saving?
1. Check if localStorage is enabled in your browser
2. Ensure you have storage space available
3. Try clearing browser cache and reloading
4. Check browser settings for storage permissions

### Tasks Disappeared?
1. Check if you cleared browser data/cache
2. Try exporting tasks as backup next time
3. Check browser's Application > LocalStorage
4. In DevTools, verify the `tasks` key exists

### Modal Won't Close?
1. Click outside the modal or the X button
2. Refresh the page if it persists
3. Check browser console for errors

## 💡 Best Practices

1. **Organize by Category**: Use categories to keep tasks organized
2. **Set Priorities**: Mark important tasks as high priority
3. **Add Descriptions**: Use descriptions for complex tasks
4. **Set Due Dates**: Help you prioritize deadline tasks
5. **Regular Backups**: Export your tasks weekly
6. **Clear Completed**: Regularly clean up finished tasks

## 🚀 Future Enhancements

Potential features for future updates:
- Cloud sync with multiple devices
- Recurring tasks (daily, weekly, monthly)
- Task reminders and notifications
- Collaborative task lists
- Dark mode
- Custom categories
- Time tracking
- Task subtasks
- Archive completed tasks instead of deleting

## 📞 Support

For issues or suggestions:
1. Check this documentation
2. Review the troubleshooting section
3. Check browser console for errors
4. Ensure browser is up to date

## 📄 License

This application is part of the SecureTrust Banking Platform.
Free to use for personal organization.

---

**Version**: 1.0  
**Last Updated**: 2025  
**Created by**: Benzica
