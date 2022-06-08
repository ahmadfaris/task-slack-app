const { DateTime } = require("luxon");

const { User, Task } = require("../../models");
const { modals } = require("../../user-interface");
const { taskReminder } = require("../../user-interface/messages");
const { reloadAppHome } = require("../../utilities");
const axios = require("axios").default;

const newTaskModalCallback = async ({ ack, view, body, client }) => {
  const providedValues = view.state.values;

  const formData = {
    name: providedValues.name.taskTitle.value,
    email: providedValues.email.taskTitle.value,
    justification: providedValues.justification.taskTitle.value,
    country: providedValues.country.item.selected_option.value,
    approver: providedValues.approver.taskAssignUser.selected_user,
    accessPeriod:
      providedValues.accessPeriod.accessPeriodRadio.selected_option.value,
    companyAccess:
      providedValues.companyAccess.companyCheckbox.selected_options,
    role: providedValues.role.roleRadio.selected_option.value,
  };

  console.log("\n=======");
  console.log(formData);
  console.log("\n=======\n");

  try {
    // https://e4scawmlll.execute-api.ap-southeast-1.amazonaws.com/log POST
    axios
      .post(
        "https://e4scawmlll.execute-api.ap-southeast-1.amazonaws.com/log",
        formData
      )
      .then(function (response) {
        console.log("response==");
        console.log(response);
      })
      .catch(function (error) {
        console.log("post error==");
        console.log(error);
      });
  } catch (error) {
    console.log("error");
    console.log(error);
  }

  // const task = Task.build({ title: taskTitle });

  // if (selectedDate) {
  //   if (!selectedTime) {
  //     await ack({
  //       response_action: "errors",
  //       errors: {
  //         taskDueTime: "Please set a time for the date you've chosen",
  //       },
  //     });
  //     return;
  //   }
  //   const taskDueDate = DateTime.fromISO(`${selectedDate}T${selectedTime}`);
  //   const diffInDays = taskDueDate.diffNow("days").toObject().days;
  //   // Task due date is in the past, so reject
  //   if (diffInDays < 0) {
  //     await ack({
  //       response_action: "errors",
  //       errors: {
  //         taskDueDate: "Please select a due date in the future",
  //         taskDueTime: "Please select a time in the future",
  //       },
  //     });
  //     return;
  //   }
  //   task.dueDate = taskDueDate;
  // }

  // try {
  //   // Grab the creating user from the DB
  //   const queryResult = await User.findOrCreate({
  //     where: {
  //       slackUserID: body.user.id,
  //       slackWorkspaceID: body.team.id,
  //     },
  //   });
  //   const user = queryResult[0];

  //   // Grab the assignee user from the DB
  //   const querySelectedUser = await User.findOrCreate({
  //     where: {
  //       slackUserID: selectedUser,
  //       slackWorkspaceID: body.team.id, // TODO better compatibility with Slack Connect.
  //     },
  //   });
  //   const selectedUserObject = querySelectedUser[0];

  //   // Persist what we know about the task so far
  //   await task.save();
  //   await task.setCreator(user);
  //   await task.setCurrentAssignee(selectedUserObject);

  //   if (task.dueDate) {
  //     const dateObject = DateTime.fromJSDate(task.dueDate);
  //     // The `chat.scheduleMessage` endpoint only accepts messages in the next 120 days,
  //     // so if the date is further than that, don't set a reminder, and let the user know.
  //     const assignee = await task.getCurrentAssignee();
  //     if (dateObject.diffNow("days").toObject().days < 120) {
  //       await client.chat
  //         .scheduleMessage(
  //           taskReminder(
  //             dateObject.toSeconds(),
  //             assignee.slackUserID,
  //             task.title,
  //             dateObject.toRelativeCalendar(),
  //             task.id
  //           )
  //         )
  //         .then(async (response) => {
  //           task.scheduledMessageId = response.scheduled_message_id;
  //           await task.save();
  //         });
  //     } else {
  //       // TODO better error message and store it in /user-interface
  //       await client.chat.postMessage({
  //         text: `Sorry, but we couldn't set a reminder for ${taskTitle}, as it's more than 120 days from now`,
  //         channel: assignee.slackUserID,
  //       });
  //     }
  //   }
  //   await task.save();
  //   await ack({
  //     response_action: "update",
  //     view: modals.taskCreated(taskTitle),
  //   });
  //   if (selectedUser !== body.user.id) {
  //     await client.chat.postMessage({
  //       channel: selectedUser,
  //       text: `<@${body.user.id}> assigned you a new task:\n- *${taskTitle}*`,
  //     });
  //     await reloadAppHome(client, selectedUser, body.team.id);
  //   }

  //   await reloadAppHome(client, body.user.id, body.team.id);
  // } catch (error) {
  //   await ack({
  //     response_action: "update",
  //     view: modals.taskCreationError(taskTitle),
  //   });
  //   // eslint-disable-next-line no-console
  //   console.error(error);
  // }
};

module.exports = { newTaskModalCallback };
