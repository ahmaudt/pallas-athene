# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

plan3 = Plan.create(student_id: 2, advisingTerm: "Spring 2023", currentTerm: "Fall 2022", recommendations: [{ course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }, { course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }, { course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }, { course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }])
plan4 = Plan.create(student_id: 2, advisingTerm: "Spring 2023", currentTerm: "Fall 2022", recommendations: [{ course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }, { course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }, { course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }, { course: "HDFS 2100", altCourse: "HDFS 2200", requirement: "intro courses"  }])