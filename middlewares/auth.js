const islogin = (req, res, next) => {
    if (req.session.user == null || req.session.user == undefined) {
        req.flash('alertMessage', 'Session Telah Habis. Silahkan Login Kembali')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/signin')
        res.redirect('/admin/signin')
    } else {
        next()
    }
}

module.exports = islogin