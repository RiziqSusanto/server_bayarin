var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/db_sppBaru', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, function () {

    // Load Mongoose models
    seeder.loadModels([
        './models/Bank',
        './models/Jurusan',
        './models/Kelas',
        './models/Murid',
        './models/Member',
        './models/Transaksi',
        './models/Users'
    ]);

    // Clear specified collections
    seeder.clearModels(['Bank', 'Jurusan', 'Kelas', 'Murid', 'Member', 'Transaksi', 'Users'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });

    });
});

var data = [
    // Start Bank
    {
        'model': 'Bank',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903322'),
                nameBank: 'Mandiri',
                nomorRekening: '089898',
                name: 'elfin',
                imageUrl: 'images/logo bca.png'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903323'),
                nameBank: 'BCA',
                nomorRekening: '878678',
                name: 'elfin',
                imageUrl: 'images/logo mandiri.png'
            }
        ]
    },

    // start Jurusan
    {
        'model': 'Jurusan',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
                name: 'Akutansi',
                kelasId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225') }
                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901112'),
                name: 'Busana Butik',
                kelasId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902226') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902227') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902228') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902229') }
                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901113'),
                name: 'Multimedia',
                kelasId: [
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902230') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902231') },
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902232') }
                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901114'),
                name: 'Rekayasa Perangkat Lunak',
                kelasId: [

                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901115'),
                name: 'Teknik Komputer Jaringan',
                kelasId: [

                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901116'),
                name: 'Teknik Kendaraan Ringan',
                kelasId: [

                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901117'),
                name: 'Teknik Permesinan',
                kelasId: [

                ]
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901118'),
                name: 'Teknik Pengelasan',
                kelasId: [

                ]
            },

        ]
    },
    // end Jurusan

    // start Kelas
    {
        'model': 'Kelas',
        'documents': [
            // X AK A
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
                name: 'X Akutansi A',
                muridId: [
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa09') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa10') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa11') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa12') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa13') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa14') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa15') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa16') }
                ],
                jurusanId: '5e96cbe292b97300fc901111'
            },
            // X AK B
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
                name: 'X Akuntansi B',
                muridId: [
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa01') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa02') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa03') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa04') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa05') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa06') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa07') },
                    // done
                    { _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa08') }
                ],
                jurusanId: '5e96cbe292b97300fc901111'
            },

            // XI AK
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902224'),
                name: 'XI Akutansi',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901111'
            },

            // XII AK
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902225'),
                name: 'XII Akutansi',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901111'
            },

            // X BB
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902226'),
                name: 'X Busana Butik',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901112'
            },

            // XI BB A
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902227'),
                name: 'XI Busana Butik A',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901112'
            },

            // XI BB B
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902228'),
                name: 'XI Busana Butik B',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901112'
            },

            // XII BB
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902229'),
                name: 'XII Busana Butik',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901112'
            },

            // X MM
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902230'),
                name: 'X Multimedia',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901113'
            },

            // XI MM
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902231'),
                name: 'XI Multimedia',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901113'
            },

            // XII MM
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc902232'),
                name: 'XII Multimedia',
                muridId: [

                ],
                jurusanId: '5e96cbe292b97300fc901113'
            },
        ]
    },
    // end Kelas

    // start Murid
    {
        'model': 'Murid',
        'documents': [
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa01'),
                nisn: '181910101',
                name: 'Clara Ana Susanti',
                jenisKelamin: 'Perempuan',
                noTelepon: '05146196565',
                alamat: 'Jln. Salam No. 67, Depok 21462, Depok',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa02'),
                nisn: '181910102',
                name: 'Olivia Aryani',
                jenisKelamin: 'Perempuan',
                noTelepon: '02058730182',
                alamat: 'Jln. Zamrud No. 266, Semarang 92071',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa03'),
                nisn: '181910103',
                name: 'Julia Puspita',
                jenisKelamin: 'Perempuan',
                noTelepon: '06113049893',
                alamat: 'Ki. Suprapto No. 373, Tidore Kepulauan 10470',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa04'),
                nisn: '181910104',
                name: 'Maimunah Cinta Hastuti',
                jenisKelamin: 'Perempuan',
                noTelepon: '082653124250',
                alamat: 'Kpg. Yoga No. 762, Padang 45160',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa05'),
                nisn: '181910105',
                name: 'Agnes Widiastuti',
                jenisKelamin: 'Perempuan',
                noTelepon: '088012631955',
                alamat: 'Jln. Sunaryo No. 468, Batu 61045, Lampung',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa06'),
                nisn: '181910106',
                name: 'Ilsa Yunita Utami',
                jenisKelamin: 'Perempuan',
                noTelepon: '08146196565',
                alamat: 'Ki. Yos No. 833, Tangerang Selatan 31237, Tanggerang',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa07'),
                nisn: '181910107',
                name: 'Azalea Handayani',
                jenisKelamin: 'Perempuan',
                noTelepon: '062359308748',
                alamat: 'Jr. Gremet No. 990, Bitung 72188, NTT',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa08'),
                nisn: '181910108',
                name: 'Ami Lala Rahmawati',
                jenisKelamin: 'Perempuan',
                noTelepon: '0876 8854 637',
                alamat: 'Jln. Bawal No. 329, jogja 27258, DIY',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902222'),
            },

            // item 2
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa09'),
                nisn: '181910109',
                name: 'Zizi Astuti',
                jenisKelamin: 'Perempuan',
                noTelepon: '02186602775',
                alamat: 'Jl Pleburan Brt 15, Jawa Tengah',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa10'),
                nisn: '181910110',
                name: 'Raisa Oni Yuniar',
                jenisKelamin: 'Perempuan',
                noTelepon: '083351682273',
                alamat: 'Jl Pasar Baru Pasar Baru Bl, Dki Jakarta',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa11'),
                nisn: '181910111',
                name: 'Nilam Mulyani',
                jenisKelamin: 'Perempuan',
                noTelepon: '082942386516',
                alamat: 'Ruko Pamulang Permai I Bl SH-12/6, Dki Jakarta',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa12'),
                nisn: '181910112',
                name: 'Wirda Nurdiyanti',
                jenisKelamin: 'Perempuan',
                noTelepon: '086060705872',
                alamat: 'Jl Budi Mulya 4 A RT 012/12, Dki Jakarta',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa13'),
                nisn: '181910113',
                name: 'Laila Devi Andriani',
                jenisKelamin: 'Perempuan',
                noTelepon: '086917156198',
                alamat: 'Wisma Metropolitan II Kav. 29-30 Jl. Jend. Sudirman Jakarta 12920-Indonesia',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa14'),
                nisn: '181910114',
                name: 'Anita Wani Mardhiyah',
                jenisKelamin: 'Perempuan',
                noTelepon: '082187626847',
                alamat: 'Jl Jelambar Utama IV 3, Dki Jakarta',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa15'),
                nisn: '181910115',
                name: 'Padmi Fitriani',
                jenisKelamin: 'Perempuan',
                noTelepon: '081970909009',
                alamat: 'Jl Raya Cimindi 74, Jawa Barat',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            },
            {
                // done
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90aa16'),
                nisn: '181910116',
                name: 'Ajeng Usamah',
                jenisKelamin: 'Perempuan',
                noTelepon: '08248111438',
                alamat: 'Jl Kelapa Dua Wetan Ciracas, Dki Jakarta',
                kelasId: mongoose.Types.ObjectId('5e96cbe292b97300fc902223'),
            }
        ]
    },
    // end Murid

    // start Transaksi
    {
        'model': 'Transaksi',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee1'),
                transaksiDate: '12-12-2020',
                nisnMurid: 181910101,
                invoice: 1231231,
                memberId: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
                payments: {
                    proofPayment: 'images/buktibayar.jpeg',
                    bankFrom: 'BCA',
                    status: 'Proses',
                    accountHolder: 'ang'
                }
            }
        ]
    },
    // end Transaksi

    // member
    {
        'model': 'Member',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
                firstName: 'Elfin',
                lastName: 'Sanjaya',
                phoneNumber: '082377954008'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903334'),
                firstName: 'Yein',
                lastName: 'Narayana',
                phoneNumber: '082377954008'
            }
        ]
    },

    {
        'model': 'Users',
        'documents': [
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
                username: 'admin',
                password: 'rahasia',
                role: 'admin'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903346'),
                username: 'dani',
                password: '123',
                role: 'operator'
            },
            {
                _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903347'),
                username: 'test',
                password: 'test',
            },
        ]
    }
];