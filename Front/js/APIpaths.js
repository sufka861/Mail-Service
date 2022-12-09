
// const domain = `https://mail-service-69zm.onrender.com`;       //used for MASTER

const domain = `http://localhost:3000`;       //used for develop/


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


  numTemplates: domain + "/api/templates/num",
  welcomeHTML: domain + "/api/welcomeHTML"


};
