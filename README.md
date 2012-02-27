# myGift

Is an extension which will allow persons you love, to help you choose presents for them.
It will add _myGift_ button to browser. By pressing the button information about current web page will be uploaded to your cloud.
extension will also provide suggestions to the client, according to their browsing history.

Even if they do not press _myGift_ button, suggestions will anyway be uploaded to your cloud so you can choose a gift secretly.

**suggestion**:
We can use [CouchDB](http://couchdb.apache.org/) as a remote database and free hosting from https://cloudant.com/

First extension will be for Google Chrome. In future we can add extensions for other browses.

We need to make mini data mining in user's browsing history. For the beginning let's filter page urls by predefined domains of web-shops.
Then we need to filter out urls which belong to particular products. For now we can guess that by url pattern. This will be fine first approximation. For future would be great to think out better algorithm.

# myGift

არის extension რომელიც საშუალებას მისცემს თქვენს საყვარელ ადამიანებს, დაგეხმარონ მათთვის საჩუქრის შერჩევაში.
ის დაამატებს _myGift_ ღილაკს ბროუზერში, რომელზე დაჭერისასაც ინფორმაცია მიმდინარე web გვერდის შესახებ აიტვირთება თქვენს cloud-ში.
Extension ასევე მიაწოდებს კლიენტს შემოთავაზებებს, მისივე browsing history-ზე დაყრდნობით.

იმ შემთხვევაშიც კი როცა ისინი არ დააჭერენ _myGift_ ღილაკს, შეთავაზებები ავტომატურად აიტვირთება სერვერზე, რაც საშუალებას მოგცემთ საიდუმლოდ იყიდოთ საჩუქარი.

**შეთავაზება**
შეგვიძლია გამოვიყენოთ [CouchDB](http://couchdb.apache.org/) როგორც მონაცემთა ბაზა და მისი უფასო ჰოსტინგი https://cloudant.com/-ზე.

პირველი extension იქნება Google Chrome-ისთვის. მომავალში შესაძლებელია extension-ების სხვა ბროუზერებისთვისაც დამატება.

საჭირო იქნება მინი "data mining"-ის ჩატარება, მომხმარებლის ისტორიაში. დასაწყისისთვის გავფილტროთ url-ები წინასწარ განსაზღვრული ელექტრონული მაღაზიების დომენების მიხედვით.
შემდეგ საჭირო იქნება ამ url-ებიდან ისეთების ამორჩევა რომლებიც კონკრეტულ პროდუქტებს შეესაბამებიან. ამისათვის, დასაწყისისთვის გამოვიყენოთ url-ების pattern (url უნდა შეიცავდეს სიმბოლოებს "product_id=" ან "/product/" ან ა.შ.). ეს იქნება საკმარისი პირველი მიახლოება. მომავალში კარგი იქნება უფრო სრულყოფილ ალგორითმს თუ მოვიფიქრებთ.