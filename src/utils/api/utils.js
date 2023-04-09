const handleResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export default handleResponce;
