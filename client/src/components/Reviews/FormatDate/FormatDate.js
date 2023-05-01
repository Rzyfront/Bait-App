function FormatDate(createdate) {
  if (createdate) {
    const dateslice = createdate.slice(0, 10);
    const parts = dateslice.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ];
    const monthName = months[Number(month) - 1];

    return `${monthName} ${day} - ${year}`;
  }
}

export default FormatDate;
