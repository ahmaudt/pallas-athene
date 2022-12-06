const fs = require('fs');
const puppeteer = require('puppeteer');

// const coreAreas = ['Foundation', 'Social', 'Humanities', 'World', 'Quantitative', 'Life', 'Physical']


(async () => {
    const coreDataAreas = ['DataListPhysical', 'DataListLife', 'DataListQuantitative', 'DataListWorld', 'DataListHumanities', 'DataListSocial']
    const coreAreas = ['Physical Science', 'Life Science', 'Quantitative', 'World Language & Culture',  'Humanities & Arts',  'Social Sciences']

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://bulletin.uga.edu/GenEdCoreBulletin');
    await page.waitForSelector('#footer');

    // iterate through core data lists and get all courses
    // for (let j = 0; j < coreAreas.length; j++) {
        for (let i = 0; i < coreDataAreas.length; i++) {
        // inteperloates the item at the given index in the array from the coreDataAreas array and gets the courses in the table
        // for the corresponding core area
        const coreDataAreaCourses = await page.$eval(`table#${coreDataAreas[i]}`, table => {
            const courses = Array.from(table.querySelectorAll('a'));
            const updatedCourses = courses.map(course => course.innerText);
            return updatedCourses.map(course => {
                return {course_code: course, credit_hrs: 3}
            })
            // return dataList;
        })
        const new_core = { 
            data: {
                [coreAreas[i]]: coreDataAreaCourses
            }
        }
        // const dataList = {[data]: {[coreAreas[i]]: coreDataAreaCourses}}
        const jsonDataList = JSON.stringify(new_core);
        fs.appendFile("../db/seeds.rb", `\ncore${i} = CoreCurriculum.create!(${jsonDataList})`, (err) => {
            if (err) throw err;
            console.log('File saved!');
        })
        
        }
        fs.readFile('hdfs_students.csv', 'utf8', (err, data) => {
            // const new_students = data.split('\n').map((line) => {
            //     const student = line.split(',')
            //     return {
            //         first_name: student[0],
            //         last_name: student[1],
            //         uga_my_id: student[2],
            //         email: student[3],
            //         programs: {
            //             program_name: student[5],
            //             program_code: student[4],
            //             credit_hrs: 61,
            //             program_type: 'major',
            //             primary_program: true
            //         }
            //     }
            // })
            const students = fs.readFileSync('hdfs_students.csv', 'utf8', (err, data) => {
                    const student_list = data.toString().replace(/\r/g, "").split('\n').map((line) => {
                        const student = line.split(',')
                        // return {
                        //     first_name: student[0],
                        //     last_name: student[1],
                        //     uga_my_id: student[2],
                        //     email: student[3],
                        //     programs: {
                        //         program_name: student[5],
                        //         program_code: student[4],
                        //         credit_hrs: 61,
                        //         program_type: 'major',
                        //         primary_program: true
                        //     }
                        // }
                    })
                })
                const student_list = students.replace(/\r/g, "").split('\n').map((line) => {
                        const items = line.split(',')
                        const student = {
                            user_id: 1,
                            data: {
                                uga_my_id: items[2],
                                first_name: items[0],
                                last_name: items[1],
                                matriculation_term: "",
                                graduation_term: "",
                                email: items[3],
                                programs: [
                                    {
                                        program_name: items[5],
                                        program_code: items[4],
                                        credit_hrs: 61,
                                        program_type: 'major',
                                        primary_program: true
                                    }
                                ]
                            }
                        }
                        return student
                    })
                    const jsonData = JSON.stringify(student_list);
                    student_list.map((student, idx) => {
                        const jsonStudent = JSON.stringify(student);
                        fs.appendFile('../db/seeds.rb', `\nstudent${idx} = Student.create!(${jsonStudent})`, (err) => {
                            if (err) throw err;
                            console.log('Student saved!')
                        })
                    })
                    // fs.appendFile("../db/seeds.rb", `\nstudents = Student.create!(${jsonData})`, (err) => {
                    //     if (err) throw err;
                    //     console.log('File saved!');
                    // })
            })
    // }
        
    

    await browser.close()
})();