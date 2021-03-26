## **Implementation Requirements:**

The original implementation requirement is to use **React.js** stack to implement the application, **Redux** to manage the data states happened in the application workflow and Webpack to manage the application building process using [this boilerplate](https://github.com/davezuko/react-redux-starter-kit) (React Redux Starter kit) or create-react-app to setup the skeleton and work on it. For details, download the [PDF](https://drive.google.com/drive/folders/1h_JN0WRkO_LRJj6HscGtH02OJjMQpHsF?usp=sharing)

## **What I'm using for the implementation:**

### [NextJS](https://github.com/vercel/next.js)

### [React Query](https://github.com/tannerlinsley/react-query)

### [TailwindCss](https://github.com/tailwindlabs/tailwindcss)

### [React Date Picker](https://github.com/Hacker0x01/react-datepicker)

### [Framer Motion](https://github.com/framer/motion)

### [React Icons](https://github.com/react-icons/react-icons)

### [Prisma](https://github.com/prisma/prisma)

### Back-End: [PostgreSQL on Heroku](https://www.heroku.com/)

### Front-End: [Deploy on Vercel](https://vercel.com/)

### Site: [next-company-form.vercel.app](https://next-company-form.vercel.app)

I'm using [TypeScript](https://github.com/microsoft/TypeScript), but you can check the JavaScript version on [feat-javascript](https://github.com/alfieqashwa/next-company-form/tree/feat-javascript) branch in its repository.

---

## **Overview page**

1. ### **Company Form**

- [x] Form cannot be submitted when any of input box is empty, and necessary required warning message (label or tooltip) should be shown for the invalid inputs.

- [x] Revenue input should be positive floor number.
- [x] Two fields of phone number should be both positive integer. Bonus if you can implement country code selection for the “code” input.

2. ### **Office Form**

- [x] Form cannot be submitted when any of input box is empty or unselected, and necessary required warning message (label or tooltip) should be shown for the invalid inputs.
- [x] Two input fields under location should be both positive float number.
- [x] Input “Office Start Date” should be able to pop up calendar for user to select the date instead of typing in the date string.

- [x] When successfully creating a new company, proper notification message should be
      shown and new company information should appear in the section titled
      “Companies” as a new widget. Moreover, the form should be reset for further use.

- [x] For each of the company widget under the section titled “Companies”, it need to display the company profile information in the format shown in the overview page.

- [x] Each company widget is also clickable, which will redirect user to
      corresponding offices page.
- [x] When clicking the cross button on the top right corner, a pop up for
      confirmation need to be shown out and after confirming, the widget will be
      removed.
      If there is no company created in the overview page yet, message “there is no
      companies created yet” should be displayed in the “Companies” section.

## **Offices Page**

- [x] As the design above shown, company information as well as the information for
      each office need to be display accordingly. When a new office created in the
      overview page for one company, it needs to be automatically shown for the offices
      page of this company.

- [x] For each office widget in section titled “offices”, when clicking the cross button on
      the top right corner, a pop up for confirmation need to be shown out and after
      confirming, the widget will be removed.

- [x] If there is no office in the offices page yet, message “there is no office created yet”
      should be displayed in the “offices” section.

- [x] When clicking the “Back to Overview” page, user will be redirect to the overview
      page.

---

## Design Model

![system overview](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/alfieqashwa/next-company-form/main/diagram/design.plantuml)

---

## Schema Relation Model

![system overview](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/alfieqashwa/next-company-form/main/diagram/schema.plantuml)
