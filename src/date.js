export const convertDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const week = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  // const milliseconds = ('00' + date.getMilliseconds()).slice(-3);

  return `${year}/${month}/${day}(${week}) ${hours}:${minutes}:${seconds}`;
}