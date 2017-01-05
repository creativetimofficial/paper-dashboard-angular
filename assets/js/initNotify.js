if ('undefined' !== typeof module) {
    inNotify = true;
    type = ['','info','success','warning','danger'];
    module.exports = function initNotify(from, align){
        color = Math.floor((Math.random() * 4) + 1);
        if (inNotify) {
            $.notify({
            	icon: "ti-gift",
            	message: "Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer."

            },{
                type: type[color],
                timer: 4000,
                placement: {
                    from: from,
                    align: align
                }
            });
            inNotify = false;
        }
    }
}
