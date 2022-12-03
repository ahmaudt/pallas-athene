const fs = require('fs');


    let dataListPhysical = ['ASTR 1010', 'GEOG 1111', 'ASTR 1010L', 'GEOG 1111L', 'ASTR 1020', 'GEOG 1113', 'ASTR 1020L', 'GEOG 1113E', 'ASTR 1110', 'GEOG 1113L', 'ASTR 1110H', 'GEOG 1125', 'ASTR 1110L', 'GEOG 1125E', 'ASTR 1120', 'GEOG 2110H', 'ASTR 1120H', 'GEOG 2120H', 'ASTR 1120L', 'GEOG 2250H', 'ASTR 1420', 'GEOG(ATSC) 1112', 'ASTR 1420E', 'GEOG(ATSC) 1112E', 'ASTR 1660', 'GEOG(ATSC) 1112L', 'ASTR 1870', 'GEOL 1120', 'ASTR 2030L', 'GEOL 1120E', 'CHEM 1110', 'GEOL 1121', 'CHEM 1110L', 'GEOL 1121E', 'CHEM 1210', 'GEOL 1121H', 'CHEM 1210E', 'GEOL 1121L', 'CHEM 1211', 'GEOL 1122', 'CHEM 1211L', 'GEOL 1122H', 'CHEM 1212', 'GEOL 1122L', 'CHEM 1212L', 'GEOL 1250-1250L', 'CHEM 1311H', 'GEOL 1260-1260L', 'CHEM 1311L', 'GEOL 2350H-2350L', 'CHEM 1312H', 'GEOL 2360H-2360L', 'CHEM 1312L', 'HONS(BIOL)(CHEM)(GEOL)(PHYS) 2070H', 'CHEM 1411', 'MARS 1010', 'CHEM 1411L', 'MARS 1010L', 'CHEM 1412', 'MARS 1011', 'CHEM 1412L', 'MARS 1011E', 'CHEM 2100', 'MARS 1015H', 'CHEM 2100L', 'MARS 1030', 'CHEM 2211', 'MARS 1030H', 'CHEM 2211L', 'PHYS 1010', 'CHEM 2212', 'PHYS 1111-1111L', 'CHEM 2212L', 'PHYS 1112-1112L', 'CHEM 2311H', 'PHYS 1211-1211L', 'CHEM 2311L', 'PHYS 1212-1212L', 'CHEM 2312H', 'PHYS 1251', 'CHEM 2312L', 'PHYS 1252', 'CRSS(WASR) 1020', 'PHYS 1311-1311L']
    let dataListLife = ['ANTH 2045', 'ECOL 1000', 'ANTH 2045L', 'ECOL 1000E', 'BIOL 1103', 'ECOL 1000H', 'BIOL 1103E', 'ECOL 1000L', 'BIOL 1103L', 'ENTO 1000', 'BIOL 1104', 'FANR 1100E', 'BIOL 1104L', 'FANR(ECOL)(GEOG) 1200', 'BIOL 1107', 'FANR(MARS) 1100', 'BIOL 1107E', 'HONS(BIOL)(CHEM)(GEOL)(PHYS) 2080H', 'BIOL 1107L', 'HORT 2000', 'BIOL 1108', 'HORT 2000E', 'BIOL 1108L', 'HORT 2000L', 'BIOL 1113E', 'MARS 1020', 'BIOL 2103S', 'MARS 1020L', 'BIOL 2107H', 'MARS 1021E', 'BIOL 2107L', 'MARS 1025H', 'BIOL 2108H', 'PBIO 1210', 'BIOL 2108L', 'PBIO 1210L', 'CRSS 2010', 'PBIO 1220', 'CRSS 2010L', 'PBIO 1220L']
    let dataListQuantitative = ['ANTH 2030', 'MATH 2270', 'ARTS 2100', 'MATH 2270H', 'ARTS 2100E', 'MATH 2300H', 'BIOS 2010', 'MATH 2310H', 'BIOS 2010E', 'MATH 2400', 'CHEM 1210', 'MATH 2400H', 'CHEM 1210E', 'MATH 2410', 'CSCI 1210', 'MATH 2410H', 'CSCI 1300-1300L', 'MATH 2500', 'CSCI 1301-1301L', 'MATH 2500E', 'CSCI 1360', 'MATH 2700', 'CSCI 1360E', 'MATH 2700E', 'CSCI 2150-2150L', 'PHIL 2500', 'CSCI 2610', 'PHIL 2500E', 'CSCI 2610E', 'PHIL 2500H', 'FANR 2010-2010L', 'PHYS 1111-1111L', 'GEOG 2011-2011L', 'PHYS 1112-1112L', 'MATH 1060', 'PHYS 1211-1211L', 'MATH 1113', 'PHYS 1212-1212L', 'MATH 1113E', 'PHYS 1251', 'MATH 2110', 'PHYS 1252', 'MATH 2110E', 'PHYS 1311-1311L', 'MATH 2200', 'SOCI 3610', 'MATH 2250', 'STAT 2000', 'MATH 2250E', 'STAT 2000E', 'MATH 2260', 'STAT 2100H', 'MATH 2260E']
    let dataListWorld = ['AESC 2050', 'JPNS 1100', 'AFST 2100E', 'JPNS 2001', 'AFST(ANTH)(CMLT)(GEOG)(SOCI)(RELI) 2100', 'JPNS 2002', 'AMHA(AFST) 1001', 'JPNS 3010', 'AMHA(AFST) 1002', 'JPNS 3020', 'AMHA(AFST) 2001', 'JPNS 4110', 'AMHA(AFST) 2002', 'KREN 1001', 'ANTH 1102', 'KREN 1002', 'ANTH 1102E', 'KREN 2001', 'ANTH 2120H', 'KREN 2002', 'ANTH 2265', 'KREN 2011', 'ARAB 1001', 'KREN 2022', 'ARAB 1002', 'KREN 3001', 'ARAB 2003', 'KREN 3002', 'ARAB 2004', 'KREN 3011', 'ARHI 2121', 'KREN 3022', 'ARHI 2300', 'KREN 4001', 'ARHI 2300E', 'KREN 4002', 'ARHI 2311H', 'LACS 1000', 'ARHI 2400', 'LACS 1000E', 'ARHI 2400E', 'LACS 1000H', 'ARHI 2411H', 'LACS 2002', 'BENG 1001', 'LACS 2020', 'BENG 1002', 'LACS 2030', 'CHNS 1001', 'LACS 2030I', 'CHNS 1002', 'LACS 2040', 'CHNS 2001', 'LACS 2040I', 'CHNS 2002', 'LAND 2510', 'CHNS 3010', 'LAND 2510E', 'CHNS 3020', 'LAND 2520', 'CHNS 4110/6110', 'LAND 2520E', 'CHNS 4120/6120', 'LATN 1001', 'CLAS(LING) 2010', 'LATN 1001W', 'CMLT 2400', 'LATN 1002', 'CMLT 2410H', 'LATN 1002W', 'CMLT 2610H', 'LATN 2001', 'CMLT(AFAM) 2600', 'LATN 2002', 'CMLT(SWAH)(AFST)(ANTH) 3001', 'LATN 2050', 'CMLT(SWAH)(AFST)(ANTH) 3001E', 'LATN 2050E', 'CMLT(SWAH)(AFST)(ANTH) 3020', 'LATN 2060', 'CMLT(SWAH)(AFST)(ANTH) 3020E', 'LATN 2060E', 'FDST 2050', 'LING 2100', 'FREN 1001', 'LING 2100E', 'FREN 1002', 'LING 2100H', 'FREN 1110', 'PERS 1001', 'FREN 2001', 'PERS 1002', 'FREN 2001E', 'PERS 2003', 'FREN 2002', 'PERS 2004', 'FREN 2030', 'PORT 1001', 'FREN 2120H', 'PORT 1002']
    let dataListHumanities = ['ARHI 2121', 'FILM 2121H', 'ARHI 2300', 'FILM(AFAM) 2130', 'ARHI 2300E', 'FREN 2700', 'ARHI 2311H', 'GRMN 2300', 'ARHI 2400', 'GRMN 2400', 'ARHI 2400E', 'GRMN 3020', 'ARHI 2411H', 'GRMN 3110', 'ARST 2100', 'GRMN 3120', 'ARST 2110', 'GRMN 3300', 'ARST 2205', 'GRMN 3610', 'ARST 2205L', 'GRMN 3620H', 'ARST 2210', 'GRMN 3710', 'ARST 2600', 'GRMN 3810', 'ARTS 2000', 'GRMN 3820', 'ARTS 2000E', 'GRMN 3830', 'ARTS 2050', 'GRMN 3870', 'ARTS 2050E', 'GRMN 4015', 'CLAS 1000', 'GRMN 4100', 'CLAS 1000E', 'LAND 1500', 'CLAS 1000H', 'LAND 1500E', 'CLAS 1010', 'LAND 2510', 'CLAS 1010E', 'LAND 2510E', 'CLAS 1010H', 'LAND 2520', 'CLAS 1020', 'LAND 2520E', 'CLAS 1020E', 'LAND 4580/6580', 'CLAS 1020H', 'LLED 2110', 'CLAS 3000', 'LLED 2110E', 'CLAS 3030', 'LLED 2110S', 'CLAS 3050', 'MUSI 2020', 'CLAS 4270/6270', 'MUSI 2020E', 'CMLT 2111', 'MUSI 2040', 'CMLT 2210', 'MUSI 2040E', 'CMLT 2212', 'MUSI 2040H', 'CMLT 2220', 'MUSI 2050', 'CMLT 2250H', 'MUSI 2060', 'CMLT 2260H', 'MUSI 2090', 'CMLT 2270H', 'MUSI 2200H', 'CMLT 2280H', 'MUSI 2300', 'CMLT 2300', 'MUSI 2300H', 'CMLT 2310', 'MUSI 2600', 'CMLT 2320H', 'MUSI(AFST)(AFAM) 2080', 'CMLT 2330H', 'PHIL 2010', 'CMLT 2400', 'PHIL 2010E', 'CMLT 2410H', 'PHIL 2010H', 'CMLT 2500', 'PHIL 2020', 'CMLT 2510H', 'PHIL 2020E', 'CMLT 2610H', 'PHIL 2020H', 'CMLT(AFAM) 2600', 'RELI 1003', 'COMM 1000', 'RELI 1003E', 'COMM 1000E', 'RELI 1008']
    let dataListSocial = ['AAEC 2580', 'HIST 2112E', 'AAEC 2580E', 'HIST 2112H', 'AAEC 2710', 'HIST 2301', 'AFAM 2000H', 'HIST 2302', 'AFAM(HIST) 2000', 'HIST 2311H', 'AFST 2100E', 'HIST 2312H', 'AFST(ANTH)(CMLT)(GEOG)(SOCI)(RELI) 2100', 'HIST 2600', 'ALDR 3820H', 'HIST 2701', 'ALDR(AFST)(LACS) 3820', 'HIST 2701H', 'ALDR(AFST)(LACS) 3820E', 'HIST 2702', 'ANTH 1102', 'HIST 2702H', 'ANTH 1102E', 'HIST(AFST) 2052', 'ANTH 2002', 'HIST(AFST) 2501', 'ANTH 2002E', 'HIST(AFST) 2502', 'ANTH 2120H', 'HIST(LACS) 2221', 'ANTH 2265', 'HIST(LACS) 2222', 'CLAS 3010', 'IHDD 2001', 'CLAS 3040', 'INTL 1100', 'CLAS 4170/6170', 'INTL 1100E', 'CLAS 4180/6180', 'INTL 1100H', 'CLAS 4190/6190', 'LACS 1000', 'CLAS(ANTH) 3015', 'LACS 1000H', 'CLAS(ANTH) 3015E', 'LACS 2002', 'ECON 2100', 'LACS 2010', 'ECON 2100E', 'LACS 2030', 'ECON 2105', 'LACS 2030I', 'ECON 2105E', 'LACS 2040', 'ECON 2105H', 'LACS 2040I', 'ECON 2106', 'LAND 2330', 'ECON 2106E', 'PHIL 2030', 'ECON 2106H', 'PHIL 2030E', 'ECON 2200', 'PHIL 2030H', 'ECON 2200E', 'PHIL 2400', 'ECON 2200H', 'PHIL 2400H', 'ENVM 2060', 'POLS 1101', 'ETAP 2200', 'POLS 1101E', 'ETAP 2200E', 'POLS 1101H', 'FANR(GEOG) 2200', 'POLS 1101S', 'FHCE 1110', 'PSYC 1030H', 'GEOG 1101', 'PSYC 1101', 'GEOG 1101E', 'PSYC 1101E', 'GEOG 1103', 'RELI(AFAM) 2005', 'GEOG 1125', 'RELI(NAMS) 2004', 'GEOG 1125E', 'RELI(NAMS) 2004H', 'GEOG 1130', 'RUSS 3300', 'GEOG 2010H', 'SOCI 1101', 'GEOG 2130H', 'SOCI 1101E', 'GEOG 2250H', 'SOCI 1101H', 'GEOG 2610', 'SOCI 2420', 'HDFS 2100', 'SOCI 2470']
    let dataListFoundation = ['ENGL 1101', 'ENGL 1101E', 'ENGL 1101S', 'ENGL 1102', 'ENGL 1102E', 'ENGL 1103', 'ENGL 1050H', 'ENGL 1060H', 'MATH 1101', 'MATH 1113', 'MATH 1113E', 'MATH 2200', 'MATH 2250', 'MATH 2250E', 'MATH 2300H', 'MATH 2400', 'MATH 2400H', 'MATH 2410', 'MATH 2410H', 'STAT 2000', 'STAT 2000E']
// add name: before each element in array and save to file in same directory
let dataLists = [dataListFoundation, dataListSocial, dataListHumanities, dataListWorld, dataListQuantitative, dataListLife, dataListPhysical]
let coreAreas = ['Foundation', 'Social', 'Humanities', 'World', 'Quantitative', 'Life', 'Physical']

coreAreas.forEach((area, i) => {
    let list = dataLists.map((list) => {
        return list.map((course) => {
            return {course_code: course, credit_hrs: 3}
        })
    })
    let coreCourseList = {[area]: list[i]}
    coreCourseList = JSON.stringify(coreCourseList)
    fs.writeFile(`${area}.json`, coreCourseList, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
})

     

// dataLists.map((list) => {
//     coreAreas.map((area, idx) => {
//         console.log(area)
//     })
// })
    // let coreList = list.map((course) => {
    //     for (let j = 0; j < coreAreas.length; j++) {
    //         return coreAreas.map((area, idx) => {
    //             area[idx] = [ { name: course } ]
    //         })
    //     }
    // //    let newCourse = {
    // //     name: course
    // //     }
    // //     return newCourse
    // })

    // coreList = JSON.stringify(coreList)
    // fs.writeFile(`${i}.json`, coreList, (err) => {
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // })



//    let updatedDl = dl.map((course) => {
//         let newCourse = {
//             name: course,
//         }
//         return newCourse
//     })
//     dataListsTerms = JSON.stringify(dataListsTerms)

// // save to file
// fs.writeFile('dlAreaTwo.json', dataListsTerms, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });
