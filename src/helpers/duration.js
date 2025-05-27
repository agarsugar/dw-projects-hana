export function getDurationDetail(startDate, endDate) {
    let start = new Date(startDate)
    let end = new Date(endDate)
    
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()
    
    if (days < 0) {
        months--
        days += 30
    }
    
    if (months < 0) {
        years--
        months += 12
    }
    
    if (years < 0) {
        years = 0
    }
    
    let result = ""
    if (years > 0) {
        result += `${years} tahun `
    }
    if (months > 0) {
        result += `${months} bulan `
    }
    if (days > 0) {
        result += `${days} hari `
    }

    return result.trim()
}