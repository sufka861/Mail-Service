//const domain = `http://localhost:3000`;    //used for DEVELOP
const domain = `https://mail-service-69zm.onrender.com`;       //used for MASTER

export const APIpaths = {
  emailsSent: domain + "/api/mail/emailsSent",
  scheduledEmails: domain + "/api/mail/scheduledEmails",
  numSentEmails: domain + "/api/mail/numOfSentEmails",
  numScheduledEmails: domain + "/api/mail/numOfEmailsToSend",
  allTemplates: domain + "/api/templates",
  templateById: domain + "/api/templates",
  sendMail: domain + "/api/mail/sendMail",
  createTemplate: domain + "/api/templates",
  editTemplate: domain + "/api/templates",
  deleteTemplate: domain + "/api/templates",
<<<<<<< HEAD

  welcomeHTML: domain + "/api/welcomeHTML"
=======
  numTemplates: domain + "/api/templates/num",
>>>>>>> 0f1fd4fb57484eac142b1a8491ee2d8db4a46c2b
};
