module.exports = (req, res) => {  
    if(req.session.loggedin){
        res.status(200).send(req.session.progressArray);
    }
    else{
        const arr = [
            [[], []],
            [[], []],
          ];
        
          arr[0][0] = 0;
          arr[0][1] = 0;
          arr[1][0] = 0;
          arr[1][1] = 0;
        res.status(200).send(arr);
    }
};
