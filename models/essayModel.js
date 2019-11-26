const mong = require('mongoose');

var schema = new mong.Schema(
    {
        name:
        {
            type: String,
        },
        essay:
        {
            type: String
        },
        grade:
        {
            type: Number
        }
    }
    );
mong.model('Essay', schema);