exports.newLevelCalculator =(totalPX, nextLevelPX)=>{
    let newLevel = 

console.log(totalPX, nextLevelPX)
}

exports.nextLevelCalculator = (nextLevelPX,level)=>{
    const newNextLevel = ((nextLevelPX * 0.2) *
     level ) + nextLevelPX
     console.log(newNextLevel)
}

const totalxp = (totalStudyHours, totalWorkingHours, lvl) => {
    const totalHours = totalStudyHours + totalWorkingHours;
    const multiple = Number(totalHours.toString().slice(0, 1)) * (25 * 2) + lvl;
    const totalxp = multiple * totalHours;
    return totalxp;
  };