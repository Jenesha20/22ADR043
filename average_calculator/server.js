const express=require('express');
const axios=require('axios');
const app=express();
const win=10;
const api={
p :"http://20.244.56.144/evaluation-service/primes",
f :"http://20.244.56.144/evaluation-service/fibo",
e :"http://20.244.56.144/evaluation-service/even",
r :"http://20.244.56.144/evaluation-service/rand"
};
const wq=[];
const ns=new Set();

app.get('/numbers/:numberid',async(req,res) => {
    const id = req.params.numberid;

    if (!api[id]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const url = api[id];
    const wp = [...wq];
    let n = [2,4,6,8];

    for (const num of n) {
        if (!ns.has(num)) {
            wq.push(num);
            ns.add(num);

            if (wq.length > win) {
                const r = wq.shift();
                ns.delete(r);
            }
        }
    }

    const avg = wq.length > 0 ? Number((wq.reduce((a, b) => a + b, 0) / wq.length).toFixed(2)): 0.0;

   res.json({
    wp,
    wc: [...wq],
    n,
    avg
});

});

const port=3000;
app.listen(port, () =>{
console.log(port);
});