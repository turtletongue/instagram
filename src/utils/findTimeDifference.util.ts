const findTimeDifference = (lastCommentDate: Date): string => {
  const currentDate = new Date();
  const months: number = currentDate.getMonth() - lastCommentDate.getMonth();
  const days: number = currentDate.getDate() - lastCommentDate.getDate();
  const hours: number = currentDate.getHours() - lastCommentDate.getHours();
  if (months) {
    if (months > 1) {
      return `${months} MONTHS AGO`;
    } else {
      return `${months} MONTH AGO`;
    }
  } else if (days) {
    if (days > 1) {
      return `${days} DAYS AGO`;
    } else {
      return `${days} DAY AGO`;
    }
  } else if (hours) {
    if (hours > 1) {
      return `${days} HOURS AGO`;
    } else {
      return `${days} HOUR AGO`;
    }
  } else {
    return '';
  }
}

export default findTimeDifference;