let sequence = 0;
let names = ['Salman','Abo Adham','Adham',
                'Abo Kinan','Kinan',
                'Rozan' , 'Hassan'];
let positions = ['SEO','CTO','ACCOUNTANT','EMPLOYEE','MANAGER'];

export function createOneCarRecord() {
    const res = {
       id: sequence,
        
        name: names[sequence%names.length],
        position : positions[sequence%positions.length],
        hours: 44 + sequence
    }
    sequence++;
    return res;
}