function errorHandler(err, req, res, next) {
  if (err.code === 400) {
    res.status(err.code).json({ message: err.message });
  } else if (err.code === 401) {
    res.status(err.code).json({ message: err.message });
  } else if (err.code === 403) {
    res.status(err.code).json({ message: err.message });
  } else if (err.code === 404) {
    res.status(err.code).json({ message: err.message });
  } else if (err.code === 500) {
    res.status(err.code).json({ message: err.message });
  }
}

module.exports = errorHandler;
