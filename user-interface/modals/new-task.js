const {
  Modal,
  Blocks,
  Elements,
  Bits,
  StaticMultiSelect,
  StaticSelect,
  Checkboxes,
  RadioButtons,
} = require("slack-block-builder");

module.exports = (prefilledTitle, currentUser) => {
  const textInput = (taskTitle) => {
    if (taskTitle) {
      return Elements.TextInput({
        placeholder: "Do this thing",
        actionId: "taskTitle",
        initialValue: taskTitle,
      });
    }
    return Elements.TextInput({
      placeholder: "Do this thing",
      actionId: "taskTitle",
    });
  };

  const countries = [
    {
      name: "Australia",
      id: "AU",
    },
    {
      name: "Hong Kong",
      id: "HK",
    },
    {
      name: "Indonesia",
      id: "ID",
    },
    {
      name: "Malaysia",
      id: "MY",
    },
    {
      name: "New Zealand",
      id: "NZ",
    },
    {
      name: "Philippines",
      id: "PH",
    },
    {
      name: "Singapore",
      id: "SG",
    },
  ];

  const companies = [
    {
      name: "JSHK",
      id: "jshk",
    },
    {
      name: "JSID",
      id: "jsid",
    },
    {
      name: "JSMY",
      id: "jsmy",
    },
    {
      name: "JSPH",
      id: "jsph",
    },
    {
      name: "JSSG",
      id: "jssg",
    },
  ];

  const roles = [
    {
      name: "Admin",
      id: "admin",
    },
    {
      name: "Analyst",
      id: "analyst",
    },
    {
      name: "Read-Only",
      id: "readonly",
    },
  ];

  const accessPeriod = [
    {
      name: "Permanent",
      id: "ermanent",
    },
    {
      name: "Temporary",
      id: "temporary",
    },
  ];

  // return Modal({ title: 'Stripe Access Form', submit: 'Create', callbackId: 'new-task-modal' })
  //   .blocks(
  //     Blocks.Input({ label: 'New task', blockId: 'taskTitle' }).element(
  //       textInput(prefilledTitle),
  //     ),
  //     Blocks.Input({ label: 'Assign user', blockId: 'taskAssignUser' }).element(
  //       Elements.UserSelect({
  //         actionId: 'taskAssignUser',
  //       }).initialUser(currentUser),
  //     ),
  //     Blocks.Input({ label: 'Due date', blockId: 'taskDueDate', optional: true }).element(
  //       Elements.DatePicker({
  //         actionId: 'taskDueDate',
  //       }),
  //     ),
  //     Blocks.Input({ label: 'Time', blockId: 'taskDueTime', optional: true }).element(
  //       Elements.TimePicker({
  //         actionId: 'taskDueTime',
  //       }),
  //     ),
  //   ).buildToJSON();
  return Modal({
    title: "Need Stripe access?",
    submit: "Create",
    callbackId: "new-task-modal",
  })
    .blocks(
      Blocks.Input({ label: "Name", blockId: "name" }).element(
        textInput("Your full name")
      ),
      Blocks.Input({ label: "Email", blockId: "email" }).element(
        textInput("email@seekasia.com")
      ),
      Blocks.Input({
        label: "Justification",
        blockId: "justification",
      }).element(textInput("Justification")),
      Blocks.Input({
        label: "Country",
        blockId: "country",
      }).element(
        StaticSelect({ placeholder: "Choose your office country" })
          .actionId("item")
          .options(
            countries.map((item) =>
              Bits.Option({ text: item.name, value: item.id })
            )
          )
      ),
      Blocks.Input({
        label: "Approver (Manager / Head)",
        blockId: "approver",
      }).element(
        Elements.UserSelect({
          actionId: "taskAssignUser",
        }).initialUser(currentUser)
      ),
      Blocks.Input({
        label: "Access period",
        blockId: "accessPeriod",
      }).element(
        RadioButtons()
          .actionId("accessPeriodRadio")
          .options(
            accessPeriod.map((item) =>
              Bits.Option({ text: item.name, value: item.id })
            )
          )
      ),
      Blocks.Input({
        label: "Company Access",
        blockId: "companyAccess",
      }).element(
        Checkboxes()
          .actionId("companyCheckbox")
          .options(
            companies.map((item) =>
              Bits.Option({ text: item.name, value: item.id })
            )
          )
      ),
      Blocks.Input({
        label: "Role",
        blockId: "role",
      }).element(
        RadioButtons()
          .actionId("roleRadio")
          .options(
            roles.map((item) =>
              Bits.Option({ text: item.name, value: item.id })
            )
          )
      )
    )
    .buildToJSON();
};
