function generateId(){
    const random = Math.random().toString(36).substring(2);
    const date = new Date.now()
    return random+date;
}