  export const getTodayStamp =() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  }
  export const getTaskDateStamp = (dateInput) => {
    if (dateInput == null) return;
    const dateInputStamp = new Date(dateInput);
    dateInputStamp.setHours(0, 0, 0, 0);
    return dateInputStamp.getTime();
  }