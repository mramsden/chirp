const fetchMessages = async () => {
  const res = await fetch('http://localhost:3000/messages?opf=body');
  return res.json();
};

const render = (templateName, data = {}) => {
  const template = document.getElementById(templateName).innerHTML;
  return Mustache.render(template, data);
}

(async () => {
  try {
    const messages = await fetchMessages();
    document.getElementById('app').innerHTML = render('messages', { messages });
  } catch (e) {
    document.getElementById('app').innerHTML = render('error');
  }
})();
