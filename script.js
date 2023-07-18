// A FAIRE :
// - Controler les transactions :
//     - on ne peut pas envoyer ou retirer un montant vide
//     - montant minimal est egale à 500
//     - on ne peut pas retirer un montant superieur à son solde
// - Ajout l'option TRANSFERT

//Les utilisateurs:
const data = [
    {
        firstname: 'Ousmane',
        lastname: 'Sonko',
        phone: '76 55 44 34',
        email: 'titi@example.com',
        photo : 'https://cdn.unitycms.io/images/7KmRhCBXqGuBwGN17CffDv.jpg?op=ocroped&val=1200,1200,1000,1000,0,0&sum=wDixfIdcjco',
        solde: 100_000,
        transactions: []
    },
    {
        firstname: 'Macky',
        lastname: 'Sall',
        phone: '76 55 44 34',
        email: 'titi@example.com',
        photo : 'https://lequotidien.sn/wp-content/uploads/2022/05/macky-SALL.jpg',
        solde: 100_000,
        transactions: []
    },
    {
        firstname: 'Breukh',
        lastname: 'DIOP',
        phone: '77 876 67 78',
        email: 'breukh@example.com',
        photo : 'https://plus.unsplash.com/premium_photo-1663088646001-1846878c096d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
        solde: 10_000_000,
        transactions: [
            {
                number:1,
                date: '22-06-2023',
                sens: 1, // -1 => retrait et 1 => depot
                amount: 2_000
            },
            {
                number:2,
                date: '19-06-2023',
                sens: -1, // -1 => retrait et 1 => depot
                amount: 25_000
            }
        ]
    },
    {
        firstname: 'Toto',
        lastname: 'WADE',
        phone: '71 189 22 09',
        email: 'wadeto@example.com',
        photo : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500q=80',
        solde: 500_000,
        transactions: [
            {
                number:1,
                date: '10-06-2023',
                sens: 1, // -1 => retrait et 1 => depot
                amount: 200_000
            }
        ]
    }
];



const btnDetail = document.querySelector('#btnDetail');
const form = document.querySelector('.form');
const btnSuivant = document.querySelector('.next');
const tbody = document.querySelector('tbody');
const btnTransaction = document.querySelector('#btnTransaction');
//
let userPosition; // Position du client actuel dans le tableau
let currentUser; //mettre ici le client affiché actuellement

//Appel de la fonction principale qui affiche les users:
loadUser();


btnDetail.addEventListener('click',()=>{
    form.classList.toggle('hide');
});
btnSuivant.addEventListener('click',()=>{
    loadUser();
});
btnTransaction.addEventListener('click',()=>{
    //recuperer le montant de la transcation
    const mnt = document.querySelector('#mnt');
    //recuperer le sens de la transaction
    const trans = document.querySelector('#trans').value;
    transaction(userPosition,+mnt.value,+trans);
    
    // let sens;
    // if(trans === 'd'){ //Depot
    //     // depot(userPosition,+mnt.value);
    //     // transaction(userPosition,+mnt.value,1);
    //     sens = 1;
    // }else if(trans === 'r'){ //Retrait
    //     // retrait(userPosition,+mnt.value);
    //     // transaction(userPosition,+mnt.value,-1);
    //     sens = 2;
    // }
    // const sens = trans === 'd' ? 1 : -1;
    // transaction(userPosition,+mnt.value,sens);

    //Reset le montant
    mnt.value = '';
});

function transaction(userPosition,montant,sens){
    const d = new Date();
    annee = d.getFullYear();
    mois = d.getMonth()+1;
    jour = d.getDate();
    const dateActu = `${jour}-${mois}-${annee}`;
    const depot = {
        number:13,
        date: dateActu,
        sens: sens, // -1 => retrait et 1 => depot
        amount: montant
    }
    //Ajouter le depot dans le tableau de transaction du client
    data[userPosition].transactions.push(depot);
    //Mettre a jour le solde du client
    data[userPosition].solde += montant * sens;
    //Mettre a jour le DOM
    loadUser(userPosition);

}

// function retrait(userPosition,montant){
//     const depot = {
//         number:13,
//         date: '20-07-2023',
//         sens: -1, // -1 => retrait et 1 => depot
//         amount: montant
//     }
//     //Ajouter le depot dans le tableau de transaction du client
//     data[userPosition].transactions.push(depot);
//     //Mettre a jour le solde du client
//     data[userPosition].solde -= montant;
//     //Mettre a jour le DOM
//     loadUser(userPosition);
// }

// function depot(userPosition,montant){
//     const depot = {
//         number:13,
//         date: '20-07-2023',
//         sens: 1, // -1 => retrait et 1 => depot
//         amount: montant
//     }
//     //Ajouter le depot dans le tableau de transaction du client
//     data[userPosition].transactions.push(depot);
//     //Mettre a jour le solde du client
//     data[userPosition].solde += montant;
//     //Mettre a jour le DOM
//     loadUser(userPosition);
// }

function getRandomPosition(max){
    return Math.floor(Math.random() * max);
}

function getRandomUser(position = -1){
    let randomPos;
    if(position == -1){
        randomPos = getRandomPosition(data.length);
    }else{
        randomPos = position
    }
    
    userPosition = randomPos;
    console.log(userPosition);
    return data[randomPos];
}

function loadUser(position = -1){ //param optionnel
    const user = getRandomUser(position);
    console.log(user.transactions);
    //Afficher les donnees de l'utilisateur
    printUser(user);
    //afficher les transactions
    printTransactions(user.transactions);
}

function printHTML(elmt, value){
    elmt.innerHTML = value;
}

function  printTransactions(transactions){
    tbody.innerHTML = '';
    let html = '';
    transactions.forEach(trans => {
        const sens = trans.sens === 1 ? 'Depot' : 'Retrait';
        html += `<tr>
                    <td>${trans.number}</td>
                    <td>${trans.date}</td>
                    <td>${sens}</td>
                    <td>${trans.amount}</td>
                </tr>`;
    });
    tbody.innerHTML = html;
}

function printUser(user){

    //charger la photo du user
    const photo = document.querySelector('.photo');
    // img.src = user.photo;
    //
    const img = new Image();
    img.src = user.photo;
    //
    photo.innerHTML = '<h6>Chargement...</h6>';
    img.onload = function(){
        for (const key in user) {
            const elt = document.querySelector('#'+key);
            if(elt){
                printHTML(elt,user[key]);
            }
        }
        //
        photo.innerHTML = img.outerHTML;
        //
        const code = document.querySelector('code');
        code.innerHTML = user.transactions.length;
    }
}

