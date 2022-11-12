# QBaG: Question Bank Generator

_QBaG: Question Bank Generator uses a crowdsourcing approach to create a question bank of objective questions and offers academicians and paper setters an interface to create questions and papers using our automated and reliable system. Contributed questions are reviewed by experts and put through a series of automated checks. The questions can be generated based on desired criteria like the board, subject, marks, difficulty, topic, medium, language, etc. The final question paper can be exported to PDF and can be saved in the application itself for future use._

_A [backend api](https://github.com/Team-Executables/qbag-backend) has been built using **Django REST framework** to achieve the same._

<br/>

**Link to the website:** [https://qbag.netlify.app/](https://qbag.netlify.app/)
<br/>
**Link to backend repo:** [https://github.com/Team-Executables/qbag-backend](https://github.com/Team-Executables/qbag-backend)
<br/>
**Link to the project presentation:** [Question Bank Generator.pdf](https://github.com/Team-Executables/qbag-frontend/blob/main/Question%20Bank%20Generator.pdf)
<br/>
<br/>

### Tech Stack ###
* React v17.0.2
* Recoil v0.6.1
* MUI v5.5.1
* jspdf v2.5.1
* axios v0.26.1
* date-fns v2.29.1
* react-speech-recognition v3.9.1
* react-material-file-upload: v0.0.4

<br/>

### Features ###
* **Responsive Design**
* **Material Design**
* **Authentication**
  * Registration
  * Login/logout
  * Account verification via email
  * Change password
  * Reset password via link on email
  * View submitted ID

* **Question Creation**
  * Similarity check to look for similar questions already present in the database
  * Inputs accepted in all languages
  * Special Status (Badge) on questions created by academicians
  * Questions undergo vetting through crowdsourcing
  * Speech to text recognition for uploading questions
  * Bulk Upload of questions in .csv/.xls format
  * Math Input in question creation
    
* **Question Generation**
  * Filtering by variety of fields like board, class, subject, etc.
  * Upvote/Downvote questions to participate in vetting
  * Provision of feedback on voting for questions
  * Download Question Paper as PDF
  * Print Question Paper
  * Save Question Paper for reference
  * Save previously added questions
  * Save input parameters as template
