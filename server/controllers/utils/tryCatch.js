const tryCatch = (controller) => {
    return async (req, res) => {
      try {
        await controller(req, res);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: 'Algo sucedio mal. Intentalo de nuevo',
        });
      }
    };
  };
  
  export default tryCatch;