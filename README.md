# Liraries and packages
-nextAuth js ,  used credential for authentication and to store user session 
-shan cn , for ui components
-tailwind
-lucide icons 


# to start the app  
- npm i 
- create a .env file with NEXTAUTH_SECRET , giving any key as it for demo purpose

# state management 
-context api , to store filter options


# for user Timesheet table,
- im first fatching all the tasks from the start date and end date ,( i have set default start and end date in the context) and can change with range selector
- for weeks timesheet table , im creating a weeks data and adding the tasks to the weeks if it fall in that date , making a model like

tableData={
    start-date,
    end-date ,
    status ,
    action,
    tasks[] 
}

on click of any action i use start-date_end-date as slug to go to weeks task sheet
-i have use a 2 helper functions to map the data and to derive the status or the action

# for week task sheet 
- i again fetch the data ,for the task with the start and end date , i dont use common context here as on post and delete i need to update the ui
- weeklyData={
    start-date,
    end-date,
    hourscompleted
    totalhours
    days:{
        date,
        tasks, 
    }
}


-i have use a 2 helper functions to map the data and to derive the status or the action in  /utils/dateUtils.ts