// Complete catalog of curriculum resources for all grades (1 to 10) and all subjects
// Following Bihar School Examination Board (BSEB, Patna) and NCERT / CBSE guidelines

export function getAllCurriculumResources() {
  return [
    // ==========================================
    // CLASS 1 (कक्षा 1)
    // ==========================================
    {
      id: "res-c01-hin",
      title: "Class 1 Hindi - किस्लय भाग-1: वर्णमाला एवं आधारभूत शब्द ज्ञान",
      title_hindi: "किस्लय भाग-1: स्वर, व्यंजन और सरल शब्द पठन",
      subject_id: "sub-hin",
      class_id: "c-01",
      grade_level: 1,
      subject_name: "Hindi",
      class_name: "Class 1-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किस्लय भाग-1' & NCERT 'सारंगी 1 / रिमझिम 1'",
      resource_type: "chapter_notes",
      description: "बिहार राज्य पाठ्यपुस्तक 'किस्लय' कक्षा 1 के स्वर-व्यंजन, चित्र पहचान, अमात्रिक दो व तीन अक्षर वाले शब्द एवं कविता 'तितली और कली' का अध्ययन सार।",
      content_markdown: `# कक्षा 1 हिंदी: किस्लय भाग-1 (SCERT बिहार एवं NCERT)
## 1. मुख्य उद्देश्य (FLN - निपुण बिहार)
- स्वर वर्ण (अ से अः) एवं व्यंजन वर्ण (क से ज्ञ) की ध्वनि-चित्र पहचान।
- चित्र देखकर पहला अक्षर बोलना और लिखना।
- बिना मात्रा वाले शब्द: घर, जल, फल, कमल, कलश, सड़क।

## 2. लोकप्रिय पाठ एवं कविताएं
1. **झूला**: झूले पर बच्चों का आनंद एवं लयबद्ध गायन।
2. **तितली और कली**: 'हरी डाल पर लगी हुई थी नन्ही सुंदर एक कली...' - तुकबंदी शब्द।
3. **आम की टोकरी**: 6 साल की छोकरी, भरकर लाई टोकरी... फल व रंगों की पहचान।

## 3. शिक्षक एवं अभिभावक अभ्यास निर्देश
- बच्चों को प्रतिदिन 10 मिनट वर्ण कार्ड दिखाकर ध्वनि उच्चारण करवाएं।
- बिहार राज्य के स्थानीय परिवेश (घर, आँगन, बाग-बगीचा) के शब्दों से जोड़ें।`,
      file_url: "https://ncert.nic.in/textbook.php?ahsk1=0-19",
      video_url: "https://www.youtube.com/results?search_query=class+1+hindi+rimjhim+sarangi",
      video_title: "Class 1 Hindi Animated Lessons & Rhymes (Full Series)",
      notification_text: "📢 निपुण बिहार FLN मूल्यांकन: कक्षा 1 के विद्यार्थियों के लिए मौखिक वर्ण पहचान परीक्षा आयोजित की जाएगी।",
      upload_date: "2026-09-01",
      author: "Anand Prakash (Primary Head)"
    },
    {
      id: "res-c01-eng",
      title: "Class 1 English - Blossom Part 1 / Joyful Phonics & Rhymes",
      title_hindi: "ब्लॉसम पार्ट 1: वर्णमाला ध्वनियाँ व राइम्स",
      subject_id: "sub-eng",
      class_id: "c-01",
      grade_level: 1,
      subject_name: "English",
      class_name: "Class 1-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Blossom Part 1' & NCERT 'Mridang 1'",
      resource_type: "chapter_notes",
      description: "Foundational English letters (A-Z Phonics), visual vocabulary, sight words (cat, dog, sun, tree) and conversational greetings.",
      content_markdown: `# Class 1 English: Blossom Part 1 & Mridang
## 1. Core Competencies
- Recognizing upper-case & lower-case letters (Aa to Zz).
- Phonic sounds (A says /æ/, B says /b/, C says /k/).
- Simple 3-letter CVC words: BAT, CAT, MAT, SUN, PIN, CUP.

## 2. Rhymes & Action Songs
- 'Two Little Hands to Clap Clap Clap'
- 'A Happy Child': My house is red, a little house...
- Classroom English: 'Good Morning Teacher', 'Thank You', 'May I come in'.`,
      file_url: "https://ncert.nic.in/textbook.php?aeen1=0-9",
      video_url: "https://www.youtube.com/results?search_query=class+1+english+mridang+ncert",
      video_title: "Class 1 English Phonics & Rhymes Animated Playlist",
      notification_text: "📢 Phonics Reading Practice: Practice 3-letter CVC word reading at home.",
      upload_date: "2026-09-01",
      author: "Sunita Verma"
    },
    {
      id: "res-c01-mat",
      title: "Class 1 Mathematics - गणित का जादू 1: आकृतियाँ एवं 1 से 100 गिनती",
      title_hindi: "गणित का जादू 1: गिनती, आकृतियाँ और सरल जोड़",
      subject_id: "sub-mat",
      class_id: "c-01",
      grade_level: 1,
      subject_name: "Mathematics",
      class_name: "Class 1-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित का जादू' कक्षा 1 & NCERT 'Math-Magic 1'",
      resource_type: "formula_sheet",
      description: "संख्या पहचान 1 से 100, बड़ा-छोटा, ऊपर-नीचे, गोला-चौकोर आकृतियाँ और वस्तुएं गिनकर एक-अंकीय जोड़ व घटाव।",
      content_markdown: `# कक्षा 1 गणित: आधारभूत संख्या ज्ञान
## 1. पूर्व-संख्या अवधारणाएँ
- बड़ा vs छोटा (हाथी vs चूहा)
- ऊपर vs नीचे (पेड़ के ऊपर चिड़िया, नीचे गेंद)
- दूर vs पास (घर से नजदीक स्कूल)

## 2. संख्याएं 1 से 20
- 1 से 9 तक की गिनती: एक दो तीन चार, पाँच छः सात आठ नौ।
- शून्य (0) की संकल्पना: टोकरी में 3 आम थे, तीनों खा लिए, क्या बचा? शून्य!
- स्थानीय मान की पहली सीढ़ी: 10 का एक बंडल = एक दहाई।

## 3. सरल जोड़ और घटाव
- 3 चिड़ियाँ + 2 चिड़ियाँ = 5 चिड़ियाँ।
- 4 लड्डू - 1 लड्डू = 3 लड्डू।`,
      file_url: "https://ncert.nic.in/textbook.php?ahmh1=0-13",
      video_url: "https://www.youtube.com/results?search_query=class+1+math+magic+full+playlist",
      video_title: "Class 1 Math Magic Complete Concepts (Hindi)",
      notification_text: "📢 Math Kit Practice: Count with abacus and pebble beads.",
      upload_date: "2026-09-01",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c01-evs",
      title: "Class 1 EVS - हमारा परिवेश: परिवार, स्वास्थ्य व प्रकृति",
      title_hindi: "हमारा परिवेश: मेरा परिवार, स्वच्छ आदतें और पशु-पक्षी",
      subject_id: "sub-evs",
      class_id: "c-01",
      grade_level: 1,
      subject_name: "Environmental Studies",
      class_name: "Class 1-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'पर्यावरण और हम' प्राथमिक स्तर गतिविधि पुस्तिका",
      resource_type: "syllabus",
      description: "शरीर के अंग, व्यक्तिगत स्वच्छता, माता-पिता का सम्मान, घरेलू पालतू पशु (गाय, बकरी, कुत्ता) और ग्रामीण परिवेश के पेड़ (नीम, पीपल, बरगद)।",
      content_markdown: `# कक्षा 1 पर्यावरण अध्ययन: हमारा परिवेश
1. **मेरा शरीर**: आँख (देखना), कान (सुनना), नाक (सूँघना), जीभ (स्वाद), त्वचा (स्पर्श)।
2. **स्वच्छ आदतें**: प्रतिदिन दाँत साफ़ करना, हाथ धोकर भोजन करना, नाखून काटना।
3. **हमारे मित्र पशु-पक्षी**: गाय, भैंस, तोता, गौरैया, मोर।
4. **प्रकृति की देन**: सूर्य (धूप और ऊर्जा), नदियां (गंगा, किऊल नदी), शुद्ध जल।`,
      file_url: "https://ncert.nic.in/textbook.php?aeev1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+1+evs+our+body+our+surroundings",
      video_title: "Class 1 EVS Animated Video Lessons",
      upload_date: "2026-09-01",
      author: "Anand Prakash"
    },

    // ==========================================
    // CLASS 2 (कक्षा 2)
    // ==========================================
    {
      id: "res-c02-hin",
      title: "Class 2 Hindi - किस्लय भाग-2: संयुक्त वर्ण एवं मनोरंजक कहानियाँ",
      title_hindi: "किस्लय भाग-2: 'ऊँट चला' व 'भालू ने खेली फुटबॉल'",
      subject_id: "sub-hin",
      class_id: "c-02",
      grade_level: 2,
      subject_name: "Hindi",
      class_name: "Class 2-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किस्लय भाग-2' & NCERT 'सारंगी 2'",
      resource_type: "chapter_notes",
      description: "मात्राओं का सटीक प्रयोग (आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ), कविता 'ऊँट चला भाई ऊँट चला' एवं शिक्षाप्रद लोककथाएँ।",
      content_markdown: `# कक्षा 2 हिंदी: किस्लय भाग-2
## 1. प्रमुख पाठ
- **पाठ 1: ऊँट चला**: रेगिस्तान का जहाज, ऊँट की विशेषताएँ एवं तुकबंदी।
- **पाठ 2: भालू ने खेली फुटबॉल**: शेर के बच्चे को फुटबॉल समझकर उछालना; हास्य कथा।
- **पाठ 3: म्याऊँ म्याऊँ**: बिल्ली की आवाज व चूहे का डर।

## 2. व्याकरण के बुनियादी नियम
- विलोम शब्द: दिन-रात, ऊपर-नीचे, हंसना-रोना।
- लिंग बदलो: लड़का-लड़की, राजा-रानी, मोर-मोरनी।
- वचन: किताब-किताबें, ताला-ताले, आँख-आँखें।`,
      file_url: "https://ncert.nic.in/textbook.php?bhsk1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+2+hindi+sarangi+rimjhim",
      video_title: "Class 2 Hindi Full Chapter Video Tutorials",
      upload_date: "2026-09-02",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c02-eng",
      title: "Class 2 English - Blossom Part 2 / Story Reading & Simple Sentences",
      title_hindi: "ब्लॉसम पार्ट 2: लघु कहानियाँ एवं वाक्य निर्माण",
      subject_id: "sub-eng",
      class_id: "c-02",
      grade_level: 2,
      subject_name: "English",
      class_name: "Class 2-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Blossom Part 2' & NCERT 'Mridang 2'",
      resource_type: "chapter_notes",
      description: "Story reading (First Day at School, Haldi's Adventure, The Wind and the Sun), Sight words, Naming words (Nouns) and Action words (Verbs).",
      content_markdown: `# Class 2 English: Core Language Skills
## 1. Selected Chapters
- **Haldi's Adventure**: Meeting Smiley the Giraffe on the way to school with spectacles and a book.
- **The Wind and the Sun**: How warmth persuades a man to take off his coat better than brute force.
- **I am Lucky**: Expressing gratitude for butterfly wings, fish swimming, and kangaroo hops.

## 2. Foundational Grammar Rules
- **Naming words (Nouns)**: Person (Ravi), Place (Gidhaur), Thing (Book), Animal (Cow).
- **Articles**: 'A' before consonant sounds (a book, a cat), 'An' before vowel sounds (an apple, an umbrella).`,
      file_url: "https://ncert.nic.in/textbook.php?been1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+2+english+mridang+all+chapters",
      video_title: "Class 2 English Animated Stories & Grammar",
      upload_date: "2026-09-02",
      author: "Sunita Verma"
    },
    {
      id: "res-c02-mat",
      title: "Class 2 Mathematics - गणित का जादू 2: दो-अंकीय जोड़-घटाव व मापन",
      title_hindi: "गणित का जादू 2: जोड़, घटाव, पहाड़े (2 से 10) और मुद्रा",
      subject_id: "sub-mat",
      class_id: "c-02",
      grade_level: 2,
      subject_name: "Mathematics",
      class_name: "Class 2-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित का जादू 2' & NCERT 'Math-Magic 2'",
      resource_type: "formula_sheet",
      description: "दहाई व इकाई, 1 से 10 तक के पहाड़े, 2-अंकीय हासिल वाले जोड़ व घटाव, सिक्के और नोट (₹1, ₹2, ₹5, ₹10, ₹20, ₹50, ₹100)।",
      content_markdown: `# कक्षा 2 गणित: मुख्य सूत्र एवं अभ्यास
## 1. दहाई और इकाई की समझ
- 25 = 2 दहाई + 5 इकाई = 20 + 5
- 78 = 7 दहाई + 8 इकाई = 70 + 8

## 2. पहाड़े (Multiplication Tables 2 to 10)
- 2 × 1 = 2 ... 2 × 10 = 20
- 5 × 5 = 25, 9 × 9 = 81, 10 × 10 = 100

## 3. मापन (Measurement)
- लंबाई: बीत्ता, कदम और सेंटीमीटर (पटरी से नापना)।
- वजन: हल्का (रुई, पंख) vs भारी (ईंट, कद्दू)।`,
      file_url: "https://ncert.nic.in/textbook.php?bhmh1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+2+math+magic+hindi+lectures",
      video_title: "Class 2 Math Magic Step-by-Step Hindi Classes",
      upload_date: "2026-09-02",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c02-evs",
      title: "Class 2 EVS - हमारा पर्यावरण 2: ऋतुएँ, जल चक्र व आवास",
      title_hindi: "हमारा परिवेश भाग-2: गर्मी, बरसात, सर्दी और हमारे सहायक",
      subject_id: "sub-evs",
      class_id: "c-02",
      grade_level: 2,
      subject_name: "Environmental Studies",
      class_name: "Class 2-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar प्राथमिक पर्यावरण अध्ययन 2",
      resource_type: "chapter_notes",
      description: "हमारे मददगार (डाकिया, पुलिस, किसान, डॉक्टर), तीनों मुख्य ऋतुएं, सुरक्षित यातायात के नियम (लाल-पीली-हरी बत्ती)।",
      content_markdown: `# कक्षा 2 पर्यावरण: हमारे सहायक व ऋतुएँ
1. **हमारे सामाजिक सहायक**:
   - किसान: खेत में अन्न और सब्जियां उगाता है।
   - डॉक्टर व नर्स: बीमार होने पर इलाज और दवा देते हैं।
   - शिक्षक: हमें लिखना, पढ़ना और अच्छे संस्कार सिखाते हैं।
2. **ऋतुएं**:
   - ग्रीष्म (गर्मी): सूती कपड़े, पंखा, आम और शरबत।
   - वर्षा (बरसात): छाता, रेनकोट, हरियाली।
   - शीत (सर्दी): ऊनी कपड़े, धूप सेंकना।`,
      file_url: "https://ncert.nic.in/textbook.php?beev1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+2+evs+seasons+our+helpers",
      video_title: "Class 2 EVS Our Helpers & Seasons Animated",
      upload_date: "2026-09-02",
      author: "Anand Prakash"
    },

    // ==========================================
    // CLASS 3 (कक्षा 3)
    // ==========================================
    {
      id: "res-c03-hin",
      title: "Class 3 Hindi - किस्लय भाग-3: प्रेरक प्रसंग व व्याकरण",
      title_hindi: "किस्लय भाग-3: कहानियाँ, मुहावरे और पर्यायवाची शब्द",
      subject_id: "sub-hin",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "Hindi",
      class_name: "Class 3-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किस्लय भाग-3' & NCERT 'रिमझिम 3 / वीणा 1'",
      resource_type: "chapter_notes",
      description: "कक्कू, शेखीबाज़ मक्खी, चाँद वाली अम्मा, बहादुर बित्तो और व्याकरण (संज्ञा, सर्वनाम, पर्यायवाची शब्द)।",
      content_markdown: `# कक्षा 3 हिंदी: किस्लय भाग-3 मुख्य बिंदु
## 1. प्रमुख पाठों का सार
- **शेखीबाज़ मक्खी**: घमंड का फल हमेशा बुरा होता है; मक्खी मकड़ी के जाले में फँस गई।
- **बहादुर बित्तो**: सूझबूझ और साहस से किसान की गाय और बैल को शेर के पंजे से बचाना।
- **टिपटिपवा**: उत्तर भारत की लोककथा; धोबी का गधा खोना और बारिश के 'टिपटिपवा' का डर।

## 2. व्याकरण अभ्यास
- **संज्ञा (Noun)**: किसी व्यक्ति, वस्तु, स्थान या भाव के नाम को संज्ञा कहते हैं। (जैसे: पटना, कलम, मोहन, मिठास)।
- **पर्यायवाची**: सूर्य (रवि, दिनकर), जल (पानी, नीर), हवा (पवन, समीर)।`,
      file_url: "https://ncert.nic.in/textbook.php?chsk1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+3+hindi+rimjhim+all+chapters",
      video_title: "Class 3 Hindi Full Textbook Animated Series",
      upload_date: "2026-09-03",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c03-eng",
      title: "Class 3 English - Blossom Part 3 / Reading & Basic Composition",
      title_hindi: "ब्लॉसम भाग-3: गुड मॉर्निंग, द मैजिक गार्डन एवं व्याकरण",
      subject_id: "sub-eng",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "English",
      class_name: "Class 3-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Blossom Part 3' & NCERT 'Santoor 3 / Marigold 3'",
      resource_type: "chapter_notes",
      description: "The Magic Garden, Bird Talk, Nina and the Baby Sparrows, Little by Little, and basic parts of speech.",
      content_markdown: `# Class 3 English: Blossom Part 3
## 1. Story Summaries
- **The Magic Garden**: School children watering sunflowers, roses, and marigolds; fairies singing sweet songs.
- **Nina and the Baby Sparrows**: Nina's care and empathy for two baby sparrows in her room before going to a wedding.
- **The Enormous Turnip**: Grandfather, grandmother, boy and girl working together to pull out the giant turnip.

## 2. Grammar Essentials
- **Adjectives (Describing words)**: Big tree, Sweet apple, Red ribbon, Tall boy.
- **Pronouns**: Words used in place of nouns (He, She, It, They, We).`,
      file_url: "https://ncert.nic.in/textbook.php?ceen1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+3+english+marigold+santoor",
      video_title: "Class 3 English Story Reading & Grammar Lessons",
      upload_date: "2026-09-03",
      author: "Sunita Verma"
    },
    {
      id: "res-c03-mat",
      title: "Class 3 Mathematics - गणित का जादू 3: 3-अंकीय संख्याएँ, गुणा व भाग",
      title_hindi: "गणित का जादू 3: गुणा, भाग, भिन्न की समझ एवं 3-अंकीय संक्रियाएँ",
      subject_id: "sub-mat",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "Mathematics",
      class_name: "Class 3-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित का जादू 3' & NCERT 'Math-Magic 3'",
      resource_type: "formula_sheet",
      description: "सैकड़ा (3-digit numbers), गुणन सारणी 11 से 20, बराबर बाँटना (भाग), कैलेंडर और घड़ी में समय देखना।",
      content_markdown: `# कक्षा 3 गणित: मुख्य सूत्र एवं संक्रियाएँ
## 1. स्थानीय मान (Place Value)
- 486 = 4 सैकड़ा + 8 दहाई + 6 इकाई = 400 + 80 + 6
- सबसे छोटी 3-अंकीय संख्या: 100
- सबसे बड़ी 3-अंकीय संख्या: 999

## 2. गुणन (Multiplication) और विभाजन (Division)
- गुणा का अर्थ बार-बार जोड़ना: 4 × 5 = 5 + 5 + 5 + 5 = 20
- भाग का अर्थ बराबर बाँटना: 12 टॉफियाँ 3 बच्चों में = 12 ÷ 3 = 4 टॉफियाँ प्रत्येक।

## 3. समय व कैलेंडर
- 1 घंटा = 60 मिनट | 1 मिनट = 60 सेकंड
- 1 वर्ष = 365 दिन (लीप वर्ष = 366 दिन, फरवरी 29 दिन)।`,
      file_url: "https://ncert.nic.in/textbook.php?chmh1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+3+math+magic+full+playlist+hindi",
      video_title: "Class 3 Math Magic Full Hindi Course",
      upload_date: "2026-09-03",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c03-evs",
      title: "Class 3 EVS - पर्यावरण और हम भाग-1: पेड़-पौधे, जल व भोजन",
      title_hindi: "पर्यावरण और हम भाग-1: पौधों की दुनिया, पानी के स्रोत और पशु आवास",
      subject_id: "sub-evs",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "Environmental Studies",
      class_name: "Class 3-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'पर्यावरण और हम' कक्षा 3 & NCERT 'आसपास 3'",
      resource_type: "chapter_notes",
      description: "पौधों की पत्तियाँ व छाल, पानी रे पानी, हमारा पहला स्कूल (परिवार), पका कर खाएं (भोजन के प्रकार) और जानवरों का आश्रय।",
      content_markdown: `# कक्षा 3 पर्यावरण: पर्यावरण और हम भाग-1
1. **पौधों के भाग**: जड़ (मिट्टी पकड़ना), तना (सहारा), पत्ती (भोजन बनाना), फूल ও फल।
2. **जल के प्राकृतिक स्रोत**: कुआँ, चापाकल, नदी (किऊल नदी, गंगा), तालाब, वर्षा का जल।
3. **भोजन की विविधता**:
   - कच्चा खाया जाने वाला भोजन: खीरा, मूली, टमाटर, गाजर।
   - पकाकर खाया जाने वाला भोजन: दाल, भात, रोटी, सब्जी।
4. **जल संरक्षण**: नल खुला न छोड़ें, वर्षा जल का संचयन करें।`,
      file_url: "https://ncert.nic.in/textbook.php?chep1=0-24",
      video_url: "https://www.youtube.com/results?search_query=class+3+evs+aas+paas+ncert+hindi",
      video_title: "Class 3 EVS Aas Paas Complete Chapters (Hindi)",
      upload_date: "2026-09-03",
      author: "Anand Prakash"
    },
    {
      id: "res-c03-cs",
      title: "Class 3 Computer Science - कंप्यूटर परिचय एवं पेंट ब्रश",
      title_hindi: "कंप्यूटर का जादू: मॉनिटर, सीपीयू, की-बोर्ड, माउस एवं एमएस पेंट",
      subject_id: "sub-cs",
      class_id: "c-03",
      grade_level: 3,
      subject_name: "Computer Science",
      class_name: "Class 3-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "State Board Digital Literacy Class 3 & NCERT ICT Curriculum",
      resource_type: "solution_guide",
      description: "इनपुट और आउटपुट उपकरण, सीपीयू (कंप्यूटर का मस्तिष्क), माउस क्लिक (सिंगल, डबल, राइट क्लिक), एमएस पेंट में चित्रकारी।",
      content_markdown: `# कक्षा 3 कंप्यूटर विज्ञान: आधारभूत सिद्धांत
1. **कंप्यूटर के 4 मुख्य भाग**:
   - **मॉनिटर**: आउटपुट स्क्रीन जहाँ चित्र व शब्द दिखते हैं।
   - **सीपीयू (CPU - Central Processing Unit)**: कंप्यूटर का दिमाग।
   - **की-बोर्ड**: बटन दबाकर लिखने (टाइप करने) वाला इनपुट उपकरण।
   - **माउस**: स्क्रीन पर तीर (पॉइंटर) घुमाने व क्लिक करने वाला उपकरण।
2. **एमएस पेंट (MS Paint)**:
   - पेंसिल टूल, ब्रश टूल, रंग भरने वाला टूल (Fill with Color), इरेज़र (मिटाना)।`,
      file_url: "https://ncert.nic.in/ict-curriculum.php",
      video_url: "https://www.youtube.com/results?search_query=class+3+computer+basics+in+hindi",
      video_title: "Class 3 Computer Basics & MS Paint Tutorial",
      upload_date: "2026-09-03",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 4 (कक्षा 4)
    // ==========================================
    {
      id: "res-c04-hin",
      title: "Class 4 Hindi - किस्लय भाग-4: देशभक्ति एवं लोक कथाएँ",
      title_hindi: "किस्लय भाग-4: मन के भोले-भाले बादल, जैसा सवाल वैसा जवाब, थप्प रोटी थप्प दाल",
      subject_id: "sub-hin",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "Hindi",
      class_name: "Class 4-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किस्लय भाग-4' & NCERT 'रिमझिम 4'",
      resource_type: "chapter_notes",
      description: "बीरबल की चतुराई (जैसा सवाल वैसा जवाब), किरमिच की गेंद, दान का हिसाब, स्वतंत्रता की ओर (गांधी जी का दांडी मार्च)।",
      content_markdown: `# कक्षा 4 हिंदी: किस्लय भाग-4 अध्ययन सामग्री
## 1. प्रमुख पाठों का संदेश
- **जैसा सवाल वैसा जवाब**: बीरबल की बुद्धिमानी; ख्वाजा सरा के तीनों प्रश्नों का रोचक उत्तर।
- **स्वतंत्रता की ओर**: बालक धनी और साबरमती आश्रम में महात्मा गांधी की दांडी नमक यात्रा की तैयारी।
- **दान का हिसाब**: अकाल के समय राजा की कंजूसी और संन्यासी द्वारा शतरंज के खानों से भिक्षा का अनोखा हिसाब।

## 2. व्याकरण के नियम
- **कारक (Case)**: कर्ता ने, कर्म को, करण से/के द्वारा, संप्रदान के लिए, अपादान से (अलग होना), संबंध का/के/की, अधिकरण में/पर, संबोधन हे/अरे।
- **मुहावरे**: आँख का तारा (बहुत प्यारा), नौ दो ग्यारह होना (भाग जाना), फूला न समाना (अत्यधिक प्रसन्न होना)।`,
      file_url: "https://ncert.nic.in/textbook.php?dhsk1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+4+hindi+rimjhim+all+chapters",
      video_title: "Class 4 Hindi Complete Video Guide (BSEB/NCERT)",
      upload_date: "2026-09-04",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c04-eng",
      title: "Class 4 English - Blossom Part 4 / Vocabulary & Sentence Composition",
      title_hindi: "ब्लॉसम भाग-4: वेक अप, एलिस इन वंडरलैंड एवं टेंस",
      subject_id: "sub-eng",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "English",
      class_name: "Class 4-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Blossom Part 4' & NCERT 'Marigold 4'",
      resource_type: "chapter_notes",
      description: "Wake Up poem, Alice in Wonderland, The Giving Tree, The Scholar's Mother Tongue (Birbal's wit), and basic Tenses.",
      content_markdown: `# Class 4 English: Core Concepts & Stories
## 1. Selected Chapters
- **Alice in Wonderland**: White rabbit with pink eyes and a waist-coat, running down a rabbit hole.
- **The Scholar's Mother Tongue**: Pandit who could speak many languages challenged the court; Birbal tickled his ear while asleep to reveal his mother tongue (Telugu).
- **The Giving Tree**: The selfless love of a tree giving its apples, branches, trunk to a growing boy.

## 2. Tenses & Grammar
- **Simple Present**: He reads a book every day.
- **Simple Past**: They played cricket yesterday in Gidhaur ground.
- **Prepositions**: in, on, under, behind, between.`,
      file_url: "https://ncert.nic.in/textbook.php?deen1=0-9",
      video_url: "https://www.youtube.com/results?search_query=class+4+english+marigold+full+course",
      video_title: "Class 4 English Complete Chapter Video Lectures",
      upload_date: "2026-09-04",
      author: "Sunita Verma"
    },
    {
      id: "res-c04-mat",
      title: "Class 4 Mathematics - गणित का जादू 4: 4-अंकीय संक्रियाएँ, भिन्न व परिमाप",
      title_hindi: "गणित का जादू 4: ईंटों से बनी इमारत, भोपाल की सैर, कबाड़ीवाली और धारिता",
      subject_id: "sub-mat",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "Mathematics",
      class_name: "Class 4-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित का जादू 4' & NCERT 'Math-Magic 4'",
      resource_type: "formula_sheet",
      description: "4 व 5 अंकीय संख्याएँ, लंबी दूरी व लंबाई (मीटर, किमी), भोपाल की यात्रा (समय, दूरी व बस टिकट की गणना), धारिता (लीटर, मिलीलीटर) और परिमाप।",
      content_markdown: `# कक्षा 4 गणित: महत्वपूर्ण सूत्र एवं विधियाँ
## 1. लंबाई, भार एवं धारिता के मात्रक
- 1 किलोमीटर (km) = 1000 मीटर (m)
- 1 मीटर (m) = 100 सेंटीमीटर (cm)
- 1 किलोग्राम (kg) = 1000 ग्राम (g)
- 1 लीटर (L) = 1000 मिलीलीटर (mL)

## 2. परिमाप (Perimeter)
- किसी बंद आकृति के चारों ओर की कुल लंबाई को परिमाप कहते हैं।
- आयत का परिमाप = 2 × (लंबाई + चौड़ाई)
- वर्ग का परिमाप = 4 × भुजा

## 3. भिन्न (Fractions)
- आधा = 1/2 | एक-चौथाई = 1/4 | तीन-चौथाई = 3/4`,
      file_url: "https://ncert.nic.in/textbook.php?dhmh1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+4+math+magic+full+playlist",
      video_title: "Class 4 Math Magic Complete Hindi Classes",
      upload_date: "2026-09-04",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c04-evs",
      title: "Class 4 EVS - पर्यावरण और हम भाग-2: बिहार की नदियाँ, धरोहर व जैव विविधता",
      title_hindi: "पर्यावरण और हम भाग-2: चलो चलें स्कूल, कान-कान में, अमृता की कहानी, बिहार के मेले",
      subject_id: "sub-evs",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "Environmental Studies",
      class_name: "Class 4-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'पर्यावरण और हम 4' & NCERT 'आसपास 4'",
      resource_type: "chapter_notes",
      description: "बिहार में स्कूली परिवहन (नाव, जुगाड़), अमृता की कहानी (खेजड़ी वृक्ष आंदोलन), मधुमक्खी पालन (अनीता की मधुमक्खियाँ - मुजफ्फरपुर बिहार) एवं सोनपुर का पशु मेला।",
      content_markdown: `# कक्षा 4 पर्यावरण: बिहार राज्य विशेष एवं पारिस्थितिकी
## 1. अनीता की मधुमक्खियाँ (मुजफ्फरपुर, बिहार)
- मुजफ्फरपुर और दरभंगा क्षेत्र में लीची के पेड़ बहुत पाए जाते हैं।
- लीची के फूल मधुमक्खियों को बहुत लुभाते हैं (अक्टूबर से दिसंबर में अंडे देने का समय)।
- एक बक्से से लगभग 12 किलोग्राम शहद प्राप्त होता है।

## 2. अमृता की कहानी (पेड़ों से प्रेम)
- राजस्थान के खेजड़ली गाँव में विश्नोई समाज द्वारा खेजड़ी पेड़ों को बचाने के लिए चिपको आंदोलन जैसी शहादत।
- 'अगर पेड़ हैं तो हम हैं।'

## 3. पक्षी एवं उनके घोंसले
- कोयल अपना घोंसला नहीं बनाती, कौवे के घोंसले में अंडे देती है।
- गौरैया और कबूतर घरों की अलमारी या रोशनदान में घोंसला बनाते हैं।`,
      file_url: "https://ncert.nic.in/textbook.php?dhep1=0-27",
      video_url: "https://www.youtube.com/results?search_query=class+4+evs+aas+paas+ncert+hindi",
      video_title: "Class 4 EVS Complete Chapters with Bihar Special",
      upload_date: "2026-09-04",
      author: "Anand Prakash"
    },
    {
      id: "res-c04-cs",
      title: "Class 4 Computer Science - विंडोज ऑपरेटिंग सिस्टम व की-बोर्ड शॉर्टकट",
      title_hindi: "कंप्यूटर ज्ञान 4: फाइल व फोल्डर, वर्डपैड और उपयोगी शॉर्टकट",
      subject_id: "sub-cs",
      class_id: "c-04",
      grade_level: 4,
      subject_name: "Computer Science",
      class_name: "Class 4-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "State Board Digital Curriculum Class 4 & NCERT ICT",
      resource_type: "formula_sheet",
      description: "डेस्कटॉप, टास्कबार, स्टार्ट मेनू, फाइल और फोल्डर बनाना, वर्डपैड में टाइपिंग और की-बोर्ड शॉर्टकट (Ctrl+C, Ctrl+V, Ctrl+S)।",
      content_markdown: `# कक्षा 4 कंप्यूटर: आवश्यक शॉर्टकट एवं संक्रियाएँ
1. **डेस्कटॉप और फोल्डर**:
   - नया फोल्डर: राइट क्लिक -> New -> Folder.
   - फाइल का नाम बदलना: राइट क्लिक -> Rename (या F2).
2. **महत्वपूर्ण की-बोर्ड शॉर्टकट**:
   - **Ctrl + C**: कॉपी करना (Copy)
   - **Ctrl + V**: पेस्ट करना (Paste)
   - **Ctrl + X**: कट करना (Cut)
   - **Ctrl + S**: फाइल सुरक्षित करना (Save)
   - **Ctrl + Z**: पूर्ववत करना (Undo)`,
      file_url: "https://ncert.nic.in/ict-curriculum.php",
      video_url: "https://www.youtube.com/results?search_query=class+4+computer+shortcuts+wordpad",
      video_title: "Class 4 Computer WordPad & Windows Shortcuts",
      upload_date: "2026-09-04",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 5 (कक्षा 5)
    // ==========================================
    {
      id: "res-c05-hin",
      title: "Class 5 Hindi - किस्लय भाग-5: देशभक्ति एवं प्रेरक जीवनियाँ",
      title_hindi: "किस्लय भाग-5: राख की रस्सी, फसलों के त्योहार (खिचड़ी/मकर संक्रांति), खिलौनेवाला",
      subject_id: "sub-hin",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Hindi",
      class_name: "Class 5-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किस्लय भाग-5' & NCERT 'रिमझिम 5'",
      resource_type: "chapter_notes",
      description: "राख की रस्सी (तिब्बत की लोककथा), फसलों के त्योहार (बिहार में दही-चूड़ा और तिलकुट), खिलौनेवाला कविता (सुभद्रा कुमारी चौहान) एवं ईदगाह (मुंशी प्रेमचंद)।",
      content_markdown: `# कक्षा 5 हिंदी: किस्लय भाग-5
## 1. प्रमुख पाठों का विश्लेषण
- **फसलों के त्योहार (मकर संक्रांति / पोंगल / बिहू)**:
  - बिहार में जनवरी माह में 'खिचड़ी' या 'सक्रांत' का पर्व; तिल, गुड़, लाई, दही-चूड़ा खाने की समृद्ध परंपरा।
- **खिलौनेवाला (कविता - सुभद्रा कुमारी चौहान)**:
  - 'वह देखो माँ आज खिलौनेवाला फिर से आया है...' बालक का राम बनने और ताड़का मारने का भाव।
- **ईदगाह (मुंशी प्रेमचंद)**:
  - अनाथ बालक हामिद और उसकी बूढ़ी दादी अमीना; 3 पैसों से मेले से दादी के लिए चिमटा खरीदना, जिससे रोटी सेकते समय दादी के हाथ न जलें।

## 2. व्याकरण के नियम
- **विशेषण और उसके भेद**: गुणवाचक (मीठा आम), संख्यावाचक (पाँच पुस्तकें), परिमाणवाचक (दो लीटर दूध), सार्वनामिक (यह लड़का)।
- **संधि परिचय**: दो वर्णों के मेल से होने वाले विकार को संधि कहते हैं (जैसे: हिम + आलय = हिमालय)।`,
      file_url: "https://ncert.nic.in/textbook.php?ehsk1=0-18",
      video_url: "https://www.youtube.com/results?search_query=class+5+hindi+rimjhim+all+chapters",
      video_title: "Class 5 Hindi Complete Video Lessons (BSEB/NCERT)",
      upload_date: "2026-09-05",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c05-eng",
      title: "Class 5 English - Blossom Part 5 / Ice-Cream Man, Teamwork & Rip Van Winkle",
      title_hindi: "ब्लॉसम भाग-5: आइसक्रीम मैन, टीमवर्क, रिप वैन विंकल एवं पत्र लेखन",
      subject_id: "sub-eng",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "English",
      class_name: "Class 5-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Blossom Part 5' & NCERT 'Marigold 5'",
      resource_type: "chapter_notes",
      description: "Ice-Cream Man, Teamwork, Flying Together (Wisdom of old wild goose), Rip Van Winkle, and Letter Writing format.",
      content_markdown: `# Class 5 English: Blossom Part 5
## 1. Core Literary Themes
- **Teamwork**: 'Teamwork, teamwork, together we can make our dream work...' The joy of passing the ball and finishing together.
- **Flying Together**: A flock of wild geese caught in a hunter's net; how united action following the old goose's counsel saved their lives.
- **Rip Van Winkle**: The kind but lazy villager who slept for twenty years in the Kaatskill mountains.

## 2. Formal Letter Writing Format
- Sender's Address & Date
- The Principal, Gidhaur Central School, Jamui
- Subject: Application for 2 days leave due to illness
- Salutation: Respected Sir/Madam
- Body: With due respect, I beg to state that...
- Subscription: Yours obediently, Name & Roll Number.`,
      file_url: "https://ncert.nic.in/textbook.php?eeen1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+5+english+marigold+all+chapters",
      video_title: "Class 5 English Video Lectures & Grammar",
      upload_date: "2026-09-05",
      author: "Sunita Verma"
    },
    {
      id: "res-c05-mat",
      title: "Class 5 Mathematics - गणित का जादू 5: भिन्न, दशमलव, क्षेत्रफल एवं कोण",
      title_hindi: "गणित का जादू 5: मछली उछली, कोण और आकृतियाँ, कितने वर्ग, हिस्से और पूरे",
      subject_id: "sub-mat",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Mathematics",
      class_name: "Class 5-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित का जादू 5' & NCERT 'Math-Magic 5'",
      resource_type: "formula_sheet",
      description: "लाख व करोड़, कोणों के प्रकार (समकोण, न्यूनकोण, अधिककोण), क्षेत्रफल व परिमाप, भिन्न एवं दशमलव की संक्रियाएँ, ल.स. (LCM) व म.स. (HCF)।",
      content_markdown: `# कक्षा 5 गणित: मास्टर फॉर्मूला शीट
## 1. भारतीय संख्या प्रणाली (Indian Number System)
- 1 लाख = 100,000 (5 शून्य)
- 1 करोड़ = 10,000,000 (7 शून्य)

## 2. कोण (Angles)
- समकोण (Right Angle) = ठीक 90° (अंग्रेजी अक्षर 'L' की तरह)
- न्यूनकोण (Acute Angle) = 90° से कम
- अधिककोण (Obtuse Angle) = 90° से अधिक और 180° से कम

## 3. क्षेत्रफल और आयतन (Area & Volume)
- आयत का क्षेत्रफल = लंबाई × चौड़ाई
- वर्ग का क्षेत्रफल = भुजा × भुजा
- घनाभ का आयतन = लंबाई × चौड़ाई × ऊंचाई

## 4. ल.स. एवं म.स. (LCM & HCF)
- LCM: सबसे छोटा उभयनिष्ठ गुणज
- HCF: सबसे बड़ा उभयनिष्ठ गुणनखंड`,
      file_url: "https://ncert.nic.in/textbook.php?ehmh1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+5+math+magic+full+playlist+hindi",
      video_title: "Class 5 Math Magic Full Course Step-by-Step",
      upload_date: "2026-09-05",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c05-evs",
      title: "Class 5 EVS - पर्यावरण और हम भाग-3: नालंदा, वाल्मीकि टाइगर रिजर्व व अंतरिक्ष",
      title_hindi: "पर्यावरण और हम भाग-3: कैसे पहचाना चींटी ने दोस्त को, ऐतिहासिक धरोहर, आपदा प्रबंधन",
      subject_id: "sub-evs",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Environmental Studies",
      class_name: "Class 5-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'पर्यावरण और हम 5' & NCERT 'आसपास 5'",
      resource_type: "chapter_notes",
      description: "चींटियों व रेशम के कीड़े की सूंघने की शक्ति, सपेरों की कहानी (कालबेलिया), चखने से पचने तक, बिहार की ऐतिहासिक धरोहर (नालंदा विश्वविद्यालय, राजगीर, गिद्धौर मिंटो टावर)।",
      content_markdown: `# कक्षा 5 पर्यावरण: विज्ञान एवं बिहार की सांस्कृतिक धरोहर
## 1. जंतुओं की अद्भुत इंद्रियाँ
- चींटियाँ चलते समय जमीन पर गंध छोड़ती हैं, जिससे पीछे वाली कतार बनाकर चलती हैं।
- रेशम का कीड़ा अपनी मादा को उसकी गंध से कई किलोमीटर दूर से पहचान लेता है।
- गिद्ध, चील और बाज हमसे 4 गुना अधिक दूर तक देख सकते हैं।

## 2. बिहार के ऐतिहासिक स्थल व अभयारण्य
- **नालंदा विश्वविद्यालय**: विश्व का प्रथम आवासीय विश्वविद्यालय, जहाँ ह्वेनसांग ने अध्ययन किया।
- **वाल्मीकि राष्ट्रीय उद्यान (पश्चिम चंपारण)**: बिहार का एकमात्र बाघ अभयारण्य (Tiger Reserve)।
- **गिद्धौर (जमुई)**: मिंटो टावर, ऐतिहासिक राजमहल एवं पतनेश्वर धाम मंदिर।

## 3. मलेरिया और रोनाल्ड रॉस
- मलेरिया मादा एनाफिलीज़ मच्छर के काटने से फैलता है।
- सिनकोना पेड़ की छाल से कुनैन की दवा बनाई जाती है।`,
      file_url: "https://ncert.nic.in/textbook.php?ehep1=0-22",
      video_url: "https://www.youtube.com/results?search_query=class+5+evs+aas+paas+ncert+hindi",
      video_title: "Class 5 EVS Complete Bihar SCERT/NCERT Lessons",
      upload_date: "2026-09-05",
      author: "Anand Prakash"
    },
    {
      id: "res-c05-san",
      title: "Class 5 Sanskrit - संस्कृत प्रबोधिनी: वर्णमाला एवं सरल अनुवाद",
      title_hindi: "संस्कृत प्रबोधिनी: अकारांत पुल्लिंग शब्द, धातु रूप (पठ्, लिख्, गम्)",
      subject_id: "sub-san",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Sanskrit",
      class_name: "Class 5-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar संस्कृत सोपान भाग-1",
      resource_type: "chapter_notes",
      description: "संस्कृत वर्णमाला, अकारांत पुल्लिंग (बालकः, रामः, गजः), धातु रूप लट् लकार (वर्तमान काल: पठति, पठतः, पठन्ति), सरल संस्कृत वाक्य।",
      content_markdown: `# कक्षा 5 संस्कृत: आधारभूत परिचय
## 1. तीन पुरुष एवं तीन वचन
- **एकवचन, द्विवचन, बहुवचन**
- **प्रथम पुरुष (Third Person)**: सः (वह), तौ (वे दोनों), ते (वे सब)
- **मध्यम पुरुष (Second Person)**: त्वम् (तुम), युवाम् (तुम दोनों), यूयम् (तुम सब)
- **उत्तम पुरुष (First Person)**: अहम् (मैं), आवाम् (हम दोनों), वयम् (हम सब)

## 2. पठ् धातु - लट् लकार (वर्तमान काल)
- सः पठति (वह पढ़ता है)
- तौ पठतः (वे दोनों पढ़ते हैं)
- ते पठन्ति (वे सब पढ़ते हैं)
- अहम् पठामि (मैं पढ़ता हूँ) | वयम् पठामः (हम सब पढ़ते हैं)`,
      file_url: "https://ncert.nic.in/textbook.php?ehsk1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+5+sanskrit+basics+for+beginners",
      video_title: "Sanskrit Basics for Beginners (Hindi Medium)",
      upload_date: "2026-09-05",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c05-cs",
      title: "Class 5 Computer Science - वर्ड प्रोसेसर एवं सुरक्षित इंटरनेट",
      title_hindi: "कंप्यूटर 5: एमएस वर्ड में डॉक्यूमेंट बनाना एवं इंटरनेट का उपयोग",
      subject_id: "sub-cs",
      class_id: "c-05",
      grade_level: 5,
      subject_name: "Computer Science",
      class_name: "Class 5-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "State Board Digital Literacy Class 5 & NCERT ICT",
      resource_type: "solution_guide",
      description: "एमएस वर्ड में फॉन्ट स्टाइल (Bold, Italic, Underline), टेबल बनाना, सुरक्षित इंटरनेट सर्च, ईमेल क्या है और साइबर सुरक्षा के नियम।",
      content_markdown: `# कक्षा 5 कंप्यूटर विज्ञान: एमएस वर्ड एवं इंटरनेट
1. **एमएस वर्ड (Microsoft Word)**:
   - फॉन्ट का आकार और रंग बदलना।
   - अलाइनमेंट: Left, Center, Right, Justify.
   - हेडर, फुटर और पेज नंबर जोड़ना।
2. **इंटरनेट और सुरक्षा**:
   - वेब ब्राउज़र: Google Chrome, Mozilla Firefox, Microsoft Edge.
   - सर्च इंजन: Google.com
   - **साइबर सुरक्षा**: अनजान लिंक पर क्लिक न करें, अपनी जन्मतिथि या पासवर्ड किसी से साझा न करें।`,
      file_url: "https://ncert.nic.in/ict-curriculum.php",
      video_url: "https://www.youtube.com/results?search_query=class+5+computer+ms+word+basics",
      video_title: "Class 5 Computer MS Word & Internet Lessons",
      upload_date: "2026-09-05",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 6 (कक्षा 6)
    // ==========================================
    {
      id: "res-c06-hin",
      title: "Class 6 Hindi - किसलय भाग-1: अरमान, हार की जीत एवं व्याकरण",
      title_hindi: "किसलय भाग-1 (कक्षा 6): 'अरमान' कविता, बाबा भारती का घोड़ा, संज्ञा-सर्वनाम",
      subject_id: "sub-hin",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Hindi",
      class_name: "Class 6-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किसलय भाग-1' कक्षा 6 & NCERT 'वसंत भाग-1'",
      resource_type: "chapter_notes",
      description: "रामनरेश त्रिपाठी की कविता 'अरमान', सुदर्शन रचित 'हार की जीत' (बाबा भारती और डाकू खड्गसिंह), व्याकरण में संज्ञा, सर्वनाम एवं संधि।",
      content_markdown: `# कक्षा 6 हिंदी: किसलय भाग-1
## 1. प्रमुख पाठ
- **पाठ 1: अरमान (कविता - रामनरेश त्रिपाठी)**:
  - 'है शौक यही यही उमंग यही, हम कुछ करके दिखलाएंगे...' देश सेवा और समाज के उपेक्षित लोगों को गले लगाने का संदेश।
- **पाठ 3: हार की जीत (कहानी - सुदर्शन)**:
  - बाबा भारती का सुल्तान घोड़ा; अपाहिज बनकर डाकू खड्गसिंह द्वारा घोड़ा छीनना।
  - बाबा भारती का अंतिम वाक्य: 'इस घटना का जिक्र किसी के सामने न करना, नहीं तो लोग किसी गरीब या अपाहिज पर विश्वास नहीं करेंगे।' डाकू का हृदय परिवर्तन।

## 2. व्याकरण के नियम
- **संज्ञा के 5 भेद**: व्यक्तिवाचक (पटना, हिमालय), जातिवाचक (नदी, पर्वत, लड़का), भाववाचक (बचपन, सुंदरता), समूहवाचक (सेना, कक्षा), द्रव्यवाचक (सोना, पानी)।`,
      file_url: "https://ncert.nic.in/textbook.php?fhvs1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+6+hindi+vasant+all+chapters",
      video_title: "Class 6 Hindi Vasant / Kislay Full Lectures",
      upload_date: "2026-09-06",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c06-eng",
      title: "Class 6 English - Radiance Part 1 / Who Did Patrick's Homework & Grammar",
      title_hindi: "रेडिएंस पार्ट 1: पैट्रिक का गृहकार्य, ए हाउस ए होम एवं एक्टिव-पैसिव",
      subject_id: "sub-eng",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "English",
      class_name: "Class 6-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Radiance Part 1' & NCERT 'Honeysuckle 6'",
      resource_type: "chapter_notes",
      description: "Who Did Patrick's Homework, How the Dog Found Himself a Master, Taro's Reward, An Indian-American Woman in Space (Kalpana Chawla).",
      content_markdown: `# Class 6 English: Key Prose & Poetry
## 1. Selected Prose Summaries
- **Who Did Patrick's Homework?**: Patrick hated doing homework; an elf promised him a wish, but made Patrick do all reading, math, and history himself! Patrick got 'A' grade through his own hard work.
- **Taro's Reward**: A dutiful, thoughtful son gets magic 'Sake' from a waterfall to warm his aged father's bones.
- **Kalpana Chawla**: First Indo-American astronaut aboard STS-107 Columbia; perseverance and courage.

## 2. Grammar Rules
- Subject-Verb Agreement: Singular subject takes singular verb (The boy plays; The boys play).
- Conjunctions: and, but, because, although.`,
      file_url: "https://ncert.nic.in/textbook.php?fhen1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+6+english+honeysuckle+full+playlist",
      video_title: "Class 6 English Honeysuckle Complete Course",
      upload_date: "2026-09-06",
      author: "Sunita Verma"
    },
    {
      id: "res-c06-mat",
      title: "Class 6 Mathematics - अपनी संख्याओं की जानकारी, पूर्णांक एवं बीजगणित",
      title_hindi: "गणित कक्षा 6: पूर्ण संख्याएँ, पूर्णांक, भिन्न, अनुपात और बीजगणित",
      subject_id: "sub-mat",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Mathematics",
      class_name: "Class 6-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 6' & NCERT 'Mathematics 6'",
      resource_type: "formula_sheet",
      description: "संख्याओं की जानकारी, विभाज्यता के नियम (2, 3, 5, 9, 11), ऋणात्मक संख्याएँ एवं पूर्णांक (Number line), भिन्न व दशमलव, प्रारंभिक ज्यामितीय अवधारणाएँ।",
      content_markdown: `# कक्षा 6 गणित: महत्वपूर्ण सूत्र एवं प्रमेय
## 1. विभाज्यता के नियम (Divisibility Rules)
- **2 से**: इकाई का अंक 0, 2, 4, 6, 8 हो।
- **3 से**: अंकों का योग 3 से विभाज्य हो।
- **5 से**: इकाई का अंक 0 या 5 हो।
- **9 से**: अंकों का योग 9 से विभाज्य हो।
- **11 से**: विषम व सम स्थानों के अंकों के योग का अंतर 0 या 11 का गुणज हो।

## 2. पूर्णांक (Integers)
- (+a) + (+b) = +(a + b)
- (-a) + (-b) = -(a + b)
- (-a) × (-b) = +(a × b)
- (+a) × (-b) = -(a × b)

## 3. अनुपात और समानुपात (Ratio & Proportion)
- a : b = c : d => a × d = b × c (बाह्य पदों का गुणनफल = मध्य पदों का गुणनफल)।`,
      file_url: "https://ncert.nic.in/textbook.php?fhmh1=0-14",
      video_url: "https://www.youtube.com/results?search_query=class+6+maths+full+syllabus+hindi+ncert",
      video_title: "Class 6 Maths Complete NCERT Course (Hindi)",
      upload_date: "2026-09-06",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c06-sci",
      title: "Class 6 Science - विज्ञान: भोजन के घटक, पदार्थों का पृथक्करण व गति",
      title_hindi: "विज्ञान कक्षा 6: कार्बोहाइड्रेट, प्रोटीन, चुंबक, पौधों को जानिए एवं प्रकाश",
      subject_id: "sub-sci",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Science",
      class_name: "Class 6-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'विज्ञान कक्षा 6' & NCERT 'Science 6'",
      resource_type: "chapter_notes",
      description: "भोजन के पोषक तत्व (कार्बोहाइड्रेट, वसा, प्रोटीन, विटामिन), पदार्थों का पृथक्करण (हस्त चयन, थ्रेशिंग, निष्पावन, निथारना), पौधों के भाग, प्रकाश, छायाएं एवं परावर्तन।",
      content_markdown: `# कक्षा 6 विज्ञान: मुख्य बिंदु एवं प्रयोग
## 1. भोजन के घटक
- **कार्बोहाइड्रेट (स्टार्च)**: ऊर्जा देने वाला पोषक तत्व; आयोडीन डालने पर नीला-काला रंग देता है।
- **प्रोटीन**: शरीर वर्धक भोजन; कॉपर सल्फेट + कास्टिक सोडा डालने पर बैंगनी रंग।
- **विटामिन C**: आंवला, नींबू, संतरा; कमी से स्कर्वी रोग।
- **विटामिन D व कैल्शियम**: हड्डियों व दांतों की मजबूती; कमी से रिकेट्स।

## 2. पदार्थों का पृथक्करण (Separation of Substances)
- **निष्पावन (Winnowing)**: वायु द्वारा भारी व हल्के अवयवों को अलग करना।
- **वाष्पन (Evaporation)**: समुद्र के जल से साधारण नमक प्राप्त करने की विधि।

## 3. प्रकाश एवं छाया
- प्रकाश हमेशा सरल रेखा (सीधी रेखा) में गमन करता है।
- पारदर्शी (काँच), अपारदर्शी (लकड़ी, दीवार), पारभासी (तेल लगा कागज़)।`,
      file_url: "https://ncert.nic.in/textbook.php?fhsc1=0-16",
      video_url: "https://www.youtube.com/results?search_query=class+6+science+full+course+hindi+ncert",
      video_title: "Class 6 Science Complete NCERT Lectures (Hindi)",
      upload_date: "2026-09-06",
      author: "Dr. Arvind Pathak"
    },
    {
      id: "res-c06-sst",
      title: "Class 6 Social Science - हमारा इतिहास, पृथ्वी हमारा आवास व नागरिक शास्त्र",
      title_hindi: "सामाजिक विज्ञान 6: सिंधु घाटी सभ्यता, ग्लोब व अक्षांश-देशांतर, पंचायती राज",
      subject_id: "sub-sst",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Social Science",
      class_name: "Class 6-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'हमारा इतिहास भाग-1', 'हमारी दुनिया भाग-1', 'सामाजिक एवं राजनीतिक जीवन'",
      resource_type: "chapter_notes",
      description: "आरंभिक मानव एवं सिंधु घाटी सभ्यता, मगध साम्राज्य का उदय, पृथ्वी की गतियां (घूर्णन व परिक्रमण), ग्लोब एवं मानचित्र, ग्राम पंचायत व स्थानीय स्वशासन।",
      content_markdown: `# कक्षा 6 सामाजिक विज्ञान: इतिहास, भूगोल व नागरिक शास्त्र
## 1. इतिहास: मगध का उत्कर्ष (बिहार)
- गंगा और सोन नदियों के तट पर स्थित मगध प्राचीन भारत का सबसे शक्तिशाली महाजनपद बना।
- प्रमुख शासक: बिंबिसार, अजातशत्रु, महापद्मनंद, चंद्रगुप्त मौर्य।
- राजधानी: आरंभ में राजगृह (राजगीर), बाद में पाटलिपुत्र (पटना)।

## 2. भूगोल: पृथ्वी की गतियां
- **घूर्णन (Rotation)**: पृथ्वी का अपनी धुरी पर घूमना (24 घंटे) -> दिन और रात का बनना।
- **परिक्रमण (Revolution)**: सूर्य के चारों ओर अंडाकार कक्षा में चक्कर लगाना (365¼ दिन) -> ऋतु परिवर्तन।

## 3. नागरिक शास्त्र: पंचायती राज व्यवस्था
- त्रि-स्तरीय प्रणाली:
  1. ग्राम स्तर पर: ग्राम पंचायत (मुखिया)
  2. प्रखंड (ब्लॉक) स्तर पर: पंचायत समिति (प्रखंड प्रमुख)
  3. जिला स्तर पर: जिला परिषद (जिला अध्यक्ष)`,
      file_url: "https://ncert.nic.in/textbook.php?fhss1=0-11",
      video_url: "https://www.youtube.com/results?search_query=class+6+social+science+full+syllabus+hindi",
      video_title: "Class 6 Social Science Complete History, Civics & Geography",
      upload_date: "2026-09-06",
      author: "Vikramaditya Roy"
    },
    {
      id: "res-c06-san",
      title: "Class 6 Sanskrit - अमृता भाग-1: वन्दना, सुभाषितानि व शब्द रूप",
      title_hindi: "अमृता भाग-1: वन्दना, संस्कृत सुभाषितानि, बालक व लता शब्द रूप",
      subject_id: "sub-san",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Sanskrit",
      class_name: "Class 6-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'अमृता भाग-1' कक्षा 6 & NCERT 'रुचिरा भाग-1'",
      resource_type: "chapter_notes",
      description: "त्वमेव माता च पिता त्वमेव..., सुभाषितानि श्लोक, बालक, लता, फल शब्द रूप सातों विभक्तियों में, लट् व लृट् लकार क्रिया रूप।",
      content_markdown: `# कक्षा 6 संस्कृत: अमृता भाग-1
## 1. मंगलाचरण (वन्दना)
- 'त्वमेव माता च पिता त्वमेव, त्वमेव बन्धुश्च सखा त्वमेव। त्वमेव विद्या द्रविणं त्वमेव, त्वमेव सर्वं मम देवदेव॥'

## 2. बालक शब्द रूप (अकारांत पुल्लिंग)
- प्रथमा: बालकः, बालकौ, बालकाः
- द्वितीया: बालकम्, बालकौ, बालकान्
- तृतीया: बालकेन, बालकाभ्याम्, बालकैः
- चतुर्थी: बालकाय, बालकाभ्याम्, बालकेभ्यः
- पंचमी: बालकात्, बालकाभ्याम्, बालकेभ्यः
- षष्ठी: बालकस्य, बालकयोः, बालकानाम्
- सप्तमी: बालके, बालकयोः, बालकेषु
- संबोधन: हे बालक!, हे बालकौ!, हे बालकाः!`,
      file_url: "https://ncert.nic.in/textbook.php?fhsk1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+6+sanskrit+ruchira+all+chapters",
      video_title: "Class 6 Sanskrit Ruchira / Amrita Complete Tutorials",
      upload_date: "2026-09-06",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c06-cs",
      title: "Class 6 Computer Science - स्क्रैच प्रोग्रामिंग एवं स्प्रेडशीट परिचय",
      title_hindi: "कंप्यूटर 6: स्क्रैच ब्लॉक कोडिंग, एक्सेल सूत्र एवं साइबर स्वच्छता",
      subject_id: "sub-cs",
      class_id: "c-06",
      grade_level: 6,
      subject_name: "Computer Science",
      class_name: "Class 6-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "State Board Digital Literacy Class 6 & NCERT ICT",
      resource_type: "solution_guide",
      description: "Scratch ब्लॉक प्रोग्रामिंग (स्प्राइट, मोशन, लूप्स), एक्सेल में टेबल और बेसिक फॉर्मूले (=SUM, =AVERAGE), साइबर सुरक्षा के नियम।",
      content_markdown: `# कक्षा 6 कंप्यूटर विज्ञान: कोडिंग एवं एक्सेल
1. **स्क्रैच (Scratch) प्रोग्रामिंग**:
   - स्प्राइट (Sprite): स्क्रीन पर चलने वाला चरित्र।
   - मोशन ब्लॉक (Motion): Move 10 steps, Turn 15 degrees.
   - इवेंट्स (Events): When Green Flag Clicked.
2. **माइक्रोसॉफ्ट एक्सेल (Excel)**:
   - सेल (Cell): रो (Row) और कॉलम (Column) का कटान बिंदु (जैसे A1, B5).
   - सूत्र =SUM(A1:A10): 10 संख्याओं का जोड़।
   - सूत्र =AVERAGE(B1:B10): औसत निकालना।`,
      file_url: "https://ncert.nic.in/ict-curriculum.php",
      video_url: "https://www.youtube.com/results?search_query=class+6+scratch+programming+hindi",
      video_title: "Class 6 Scratch Coding & MS Excel Course",
      upload_date: "2026-09-06",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 7 (कक्षा 7)
    // ==========================================
    {
      id: "res-c07-hin",
      title: "Class 7 Hindi - किसलय भाग-2: मानव बनो, वीर कुंवर सिंह व व्याकरण",
      title_hindi: "किसलय भाग-2: शिवमंगल सिंह 'सुमन' की कविता, बाबू वीर कुंवर सिंह, समास",
      subject_id: "sub-hin",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Hindi",
      class_name: "Class 7-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किसलय भाग-2' कक्षा 7 & NCERT 'वसंत भाग-2'",
      resource_type: "chapter_notes",
      description: "मानव बनो (शिवमंगल सिंह सुमन), नचिकेता (यमराज से तीन वरदान), 1857 की क्रांति के महानायक बाबू वीर कुंवर सिंह (जगदीशपुर, बिहार), समास एवं अलंकार।",
      content_markdown: `# कक्षा 7 हिंदी: किसलय भाग-2
## 1. प्रमुख पाठ
- **पाठ 1: मानव बनो (कविता)**:
  - 'है भूल करना प्यार भी, है भूल यह गुहार भी... पर भूल है सबसे बड़ी, करना किसी का आसरा। मानव बनो, मानव बनो!'
- **पाठ 6: वीर कुंवर सिंह (1857 क्रांति के अमर सेनानी)**:
  - बिहार के जगदीशपुर (आरा) के 80 वर्षीय वीर जमींदार, जिन्होंने अंग्रेजों के दांत खट्टे किए।
  - गंगा पार करते समय हाथ में गोली लगने पर अपनी ही तलवार से बायाँ हाथ काटकर गंगा मैया को समर्पित कर दिया।

## 2. समास के 6 भेद
1. अव्ययीभाव (यथाशक्ति, प्रतिदिन)
2. तत्पुरुष (राजपुत्र, देशसेवा)
3. कर्मधारय (नीलकमल, चरणकमल)
4. द्विगु (त्रिफला, चौराहा)
5. द्वंद्व (माता-पिता, सुख-दुख)
6. बहुव्रीहि (दशानन, पीतांबर)`,
      file_url: "https://ncert.nic.in/textbook.php?ghvs1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+7+hindi+vasant+all+chapters",
      video_title: "Class 7 Hindi Vasant / Kislay Full Lectures",
      upload_date: "2026-09-07",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c07-eng",
      title: "Class 7 English - Radiance Part 2 / Three Questions & Gift of Chappals",
      title_hindi: "रेडिएंस पार्ट 2: लियो टॉल्स्टॉय के तीन प्रश्न, गिफ्ट ऑफ चप्पल्स एवं ग्रामर",
      subject_id: "sub-eng",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "English",
      class_name: "Class 7-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Radiance Part 2' & NCERT 'Honeycomb 7'",
      resource_type: "chapter_notes",
      description: "Three Questions (Leo Tolstoy), A Gift of Chappals, Gopal and the Hilsa Fish, The Rebel, and Direct/Indirect Speech.",
      content_markdown: `# Class 7 English: Honeycomb & Radiance
## 1. Selected Prose Summaries
- **Three Questions (Leo Tolstoy)**: A King wanted to know: What is the most important time? Who are the most important people? What is the most important thing to do?
  - Hermit's answer: The most important time is NOW (the present). The most important person is the one you are with. The most important thing is to do good to that person.
- **A Gift of Chappals**: Children in Madras giving music teacher's chappals to a blistered beggar; innocence and boundless compassion.

## 2. Active and Passive Voice
- Active: Ram wrote a letter.
- Passive: A letter was written by Ram.
- Rule: Subject becomes object with 'by', and verb changes to past participle (V3).`,
      file_url: "https://ncert.nic.in/textbook.php?ghen1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+7+english+honeycomb+full+course",
      video_title: "Class 7 English Honeycomb Animated Lessons",
      upload_date: "2026-09-07",
      author: "Sunita Verma"
    },
    {
      id: "res-c07-mat",
      title: "Class 7 Mathematics - पूर्णांक, भिन्न एवं सरल समीकरण",
      title_hindi: "गणित कक्षा 7: पूर्णांकों के गुणन-विभाजन, सरल समीकरण, रेखाएं और कोण",
      subject_id: "sub-mat",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Mathematics",
      class_name: "Class 7-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 7' & NCERT 'Mathematics 7'",
      resource_type: "formula_sheet",
      description: "पूर्णांकों के नियम, भिन्न एवं दशमलव का गुणा-भाग, सरल समीकरण (ax + b = c), शीर्षाभिमुख कोण, संगत कोण, त्रिभुज के गुणधर्म (पाइथागोरस प्रमेय)।",
      content_markdown: `# कक्षा 7 गणित: मुख्य सूत्र एवं नियम
## 1. सरल समीकरण (Simple Equations)
- यदि ax + b = c, तो ax = c - b => x = (c - b) / a.
- उदाहरण: 3x + 7 = 22 => 3x = 15 => x = 5.

## 2. रेखाएं एवं कोण (Lines & Angles)
- **पूरक कोण (Complementary)**: दो कोणों का योग 90° हो।
- **संपूरक कोण (Supplementary)**: दो कोणों का योग 180° हो।
- **शीर्षाभिमुख कोण (Vertically Opposite Angles)**: हमेशा परस्पर बराबर होते हैं।

## 3. पाइथागोरस प्रमेय (Pythagoras Theorem)
- समकोण त्रिभुज में: (कर्ण)² = (लंब)² + (आधार)²
- h² = p² + b² (जैसे: 3² + 4² = 9 + 16 = 25 = 5²).`,
      file_url: "https://ncert.nic.in/textbook.php?ghmh1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+7+maths+full+syllabus+hindi+ncert",
      video_title: "Class 7 Maths Full NCERT Video Lectures (Hindi)",
      upload_date: "2026-09-07",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c07-sci",
      title: "Class 7 Science - पादपों में पोषण, ऊष्मा एवं अम्ल, क्षारक व लवण",
      title_hindi: "विज्ञान कक्षा 7: प्रकाश संश्लेषण, ऊष्मा का संचरण, लिटमस पत्र एवं श्वसन",
      subject_id: "sub-sci",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Science",
      class_name: "Class 7-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'विज्ञान कक्षा 7' & NCERT 'Science 7'",
      resource_type: "chapter_notes",
      description: "प्रकाश संश्लेषण (Photosynthesis), ऊष्मा संचरण की तीन विधियाँ (चालन, संवहन, विकिरण), अम्ल, क्षारक एवं सूचक (लिटमस, हल्दी), जीवों में श्वसन व रक्त परिसंचरण।",
      content_markdown: `# कक्षा 7 विज्ञान: प्रमुख वैज्ञानिक सिद्धांत
## 1. पादपों में पोषण (Photosynthesis)
- 6CO₂ + 6H₂O + सूर्य का प्रकाश + क्लोरोफिल -> C₆H₁₂O₆ (ग्लूकोज) + 6O₂
- पत्तियों के रंध्र (Stomata) गैसों के आदान-प्रदान में सहायता करते हैं।

## 2. ऊष्मा का स्थानांतरण (Heat Transfer)
- **चालन (Conduction)**: ठोसों में कणों के कंपन द्वारा ऊष्मा संचरण (चम्मच का गर्म होना)।
- **संवहन (Convection)**: द्रवों और गैसों में वास्तविक गति द्वारा (पानी उबलना, समुद्री समीर)।
- **विकिरण (Radiation)**: बिना किसी माध्यम के (सूर्य की धूप पृथ्वी तक पहुँचना)।

## 3. अम्ल, क्षारक एवं लवण
- **अम्ल (Acid)**: स्वाद में खट्टे, नीले लिटमस को लाल करते हैं (HCl, सिरका, सिट्रिक एसिड)।
- **क्षारक (Base)**: स्वाद में कड़वे, छूने में साबुन जैसे, लाल लिटमस को नीला करते हैं (NaOH, चूने का पानी)।
- अम्ल + क्षारक -> लवण + जल (उदासीनीकरण अभिक्रिया)।`,
      file_url: "https://ncert.nic.in/textbook.php?ghsc1=0-18",
      video_url: "https://www.youtube.com/results?search_query=class+7+science+full+course+hindi+ncert",
      video_title: "Class 7 Science Full Chapters in Hindi",
      upload_date: "2026-09-07",
      author: "Dr. Arvind Pathak"
    },
    {
      id: "res-c07-sst",
      title: "Class 7 Social Science - मध्यकालीन भारत, पर्यावरण व राज्य शासन",
      title_hindi: "सामाजिक विज्ञान 7: दिल्ली सल्तनत, मुगल साम्राज्य, वायुमंडल व विधानसभा",
      subject_id: "sub-sst",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Social Science",
      class_name: "Class 7-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'हमारा इतिहास 2', 'हमारी दुनिया 2', 'सामाजिक व राजनीतिक जीवन 2'",
      resource_type: "chapter_notes",
      description: "दिल्ली सल्तनत (इल्तुतमिश, रजिया सुल्तान, अलाउद्दीन खिलजी), मुगल साम्राज्य (बाबर, अकबर, शाहजहाँ), वायुमंडल की परतें, राज्य सरकार (विधायक - MLA, मुख्यमंत्री, राज्यपाल)।",
      content_markdown: `# कक्षा 7 सामाजिक विज्ञान: इतिहास, भूगोल एवं नागरिक शास्त्र
## 1. इतिहास: मुगल साम्राज्य
- 1526: पानीपत का प्रथम युद्ध - बाबर ने इब्राहिम लोदी को हराकर मुगल साम्राज्य स्थापित किया।
- **अकबर (1556-1605)**: सुलह-ए-कुल की नीति, नवरत्न, मनसबदारी व्यवस्था, दीन-ए-इलाही।
- बिहार में शेरशाह सूरी (सासाराम का मकबरा): ग्रांड ट्रंक रोड (GT Road) का निर्माण, 'रुपया' मुद्रा का प्रचलन।

## 2. भूगोल: वायुमंडल की संरचना
1. **क्षोभमंडल (Troposphere)**: सभी मौसमी घटनाएँ (वर्षा, बादल, कोहरा) इसी में होती हैं।
2. **समतापमंडल (Stratosphere)**: ओजोन परत मौजूद; हवाई जहाज उड़ाने के लिए आदर्श।
3. **मध्यमंडल (Mesosphere)**: उल्कापिंड जलकर नष्ट होते हैं।
4. **बाह्य वायुमंडल / आयनमंडल**: रेडियो तरंगों का परावर्तन।

## 3. नागरिक शास्त्र: राज्य शासन
- विधानसभा सदस्य को **विधायक (MLA)** कहते हैं, जो जनता द्वारा चुने जाते हैं।
- बहुमत प्राप्त दल का नेता **मुख्यमंत्री** बनता है। राज्यपाल राज्य का संवैधानिक प्रधान होता है।`,
      file_url: "https://ncert.nic.in/textbook.php?ghss1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+7+social+science+full+syllabus+hindi",
      video_title: "Class 7 Social Science Complete Video Course (Hindi)",
      upload_date: "2026-09-07",
      author: "Vikramaditya Roy"
    },
    {
      id: "res-c07-san",
      title: "Class 7 Sanskrit - अमृता भाग-2: नीति श्लोक, कारक व लकार",
      title_hindi: "अमृता भाग-2: चाणक्य नीति श्लोक, कारक प्रकरण एवं लङ् लकार (भूतकाल)",
      subject_id: "sub-san",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Sanskrit",
      class_name: "Class 7-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'अमृता भाग-2' कक्षा 7 & NCERT 'रुचिरा भाग-2'",
      resource_type: "chapter_notes",
      description: "चाणक्य नीति श्लोक, कारक एवं विभक्ति के नियम, लङ् लकार (भूतकाल: अपठत्, अपठताम्, अपठन्), अस्मद् व युष्मद् सर्वनाम रूप।",
      content_markdown: `# कक्षा 7 संस्कृत: अमृता भाग-2
## 1. नीति श्लोक (चाणक्य नीति)
- 'पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम्। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते॥'
  - भावार्थ: पृथ्वी पर तीन ही सच्चे रत्न हैं - जल, अन्न और मधुर वाणी। मूर्ख लोग पत्थर के टुकड़ों को रत्न कहते हैं।

## 2. लङ् लकार (भूतकाल - Past Tense) - पठ् धातु
- प्रथम पुरुष: अपठत्, अपठताम्, अपठन्
- मध्यम पुरुष: अपठः, अपठतम्, अपठत
- उत्तम पुरुष: अपठम्, अपठाव, अपठाम`,
      file_url: "https://ncert.nic.in/textbook.php?ghsk1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+7+sanskrit+ruchira+all+chapters",
      video_title: "Class 7 Sanskrit Ruchira / Amrita Complete Course",
      upload_date: "2026-09-07",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c07-cs",
      title: "Class 7 Computer Science - एचटीएमएल वेब डिजाइनिंग एवं साइबर सुरक्षा",
      title_hindi: "कंप्यूटर 7: HTML टैग्स, वेब पेज निर्माण एवं साइबर अपराध से बचाव",
      subject_id: "sub-cs",
      class_id: "c-07",
      grade_level: 7,
      subject_name: "Computer Science",
      class_name: "Class 7-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "State Board Digital Literacy Class 7 & NCERT ICT",
      resource_type: "solution_guide",
      description: "HTML आधारभूत संरचना (<html>, <head>, <title>, <body>), हेडिंग टैग्स (h1 to h6), इमेज व लिंक जोड़ना, वायरस और एंटीवायरस।",
      content_markdown: `# कक्षा 7 कंप्यूटर: HTML एवं वेब पेज डिजाइन
1. **बेसिक HTML संरचना**:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>मेरा विद्यालय - गिद्धौर सेंट्रल स्कूल</title>
</head>
<body bgcolor="#f0f8ff">
  <h1>स्वागतम् - EduNexus Gidhaur</h1>
  <p>यह हमारा पहला ऑनलाइन वेब पेज है।</p>
  <a href="https://gidhaurschool.bihar.gov.in">स्कूल वेबसाइट</a>
</body>
</html>
\`\`\`
2. **साइबर सुरक्षा**:
   - वायरस (VIRUS): Vital Information Resources Under Siege.
   - फिशिंग (Phishing): फर्जी ईमेल या मैसेज भेजकर पासवर्ड चुराना।
   - एंटीवायरस: Quick Heal, Norton, Windows Defender.`,
      file_url: "https://ncert.nic.in/ict-curriculum.php",
      video_url: "https://www.youtube.com/results?search_query=class+7+computer+html+basics+hindi",
      video_title: "Class 7 Computer HTML Basics & Web Design Tutorial",
      upload_date: "2026-09-07",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 8 (कक्षा 8)
    // ==========================================
    {
      id: "res-c08-hin",
      title: "Class 8 Hindi - किसलय भाग-3: तू जिंदा है तो, छोटा जादूगर व व्याकरण",
      title_hindi: "किसलय भाग-3: शंकर शैलेंद्र, जयशंकर प्रसाद, कर्मवीर (अयोध्या सिंह उपाध्याय)",
      subject_id: "sub-hin",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Hindi",
      class_name: "Class 8-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'किसलय भाग-3' कक्षा 8 & NCERT 'वसंत भाग-3'",
      resource_type: "chapter_notes",
      description: "तू जिंदा है तो ज़िंदगी की जीत में यकीन कर (शंकर शैलेंद्र), छोटा जादूगर (जयशंकर प्रसाद), कर्मवीर, हुंडरू का जलप्रपात, सुदामा चरित एवं संधि-समास।",
      content_markdown: `# कक्षा 8 हिंदी: किसलय भाग-3
## 1. प्रमुख पाठों का संदेश
- **तू जिंदा है तो (कविता - शंकर शैलेंद्र)**:
  - 'तू जिंदा है तो ज़िंदगी की जीत में यकीन कर, अगर कहीं है स्वर्ग तो उतार ला ज़मीन पर।'
- **कर्मवीर (अयोध्या सिंह उपाध्याय 'हरिऔध')**:
  - 'देखकर बाधा विविध बहु विघ्न घबराते नहीं, रह भरोसे भाग के दुख भोग पछताते नहीं। काम कितना ही कठिन हो किन्तु उकताते नहीं।'
- **हुंडरू का जलप्रपात (यात्रा वृतांत - कामता प्रसाद सिंह 'काम')**:
  - छोटानागपुर के पठार और स्वर्णरेखा नदी के जलप्रपात की प्राकृतिक सुंदरता।

## 2. व्याकरण: छंद एवं रस परिचय
- **श्रृंगार रस, वीर रस, करुण रस, हास्य रस**।
- **उपसर्ग ও प्रत्यय**: शब्द के पहले लगने वाला शब्दांश उपसर्ग (दुर् + बल = दुर्बल); अंत में लगने वाला प्रत्यय (मानव + ता = मानवता)।`,
      file_url: "https://ncert.nic.in/textbook.php?hhvs1=0-18",
      video_url: "https://www.youtube.com/results?search_query=class+8+hindi+vasant+all+chapters",
      video_title: "Class 8 Hindi Complete Video Course",
      upload_date: "2026-09-08",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c08-eng",
      title: "Class 8 English - Radiance Part 3 / The Best Christmas Present & Grammar",
      title_hindi: "रेडिएंस पार्ट 3: द बेस्ट क्रिसमस प्रेजेंट, त्सुनामी, ग्लिम्प्स ऑफ द पास्ट",
      subject_id: "sub-eng",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "English",
      class_name: "Class 8-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'Radiance Part 3' & NCERT 'Honeydew 8'",
      resource_type: "chapter_notes",
      description: "The Best Christmas Present in the World (WW1 Christmas truce), The Tsunami (Animal senses & survival), Glimpses of the Past (1857 revolt), Bepin Choudhury's Lapse of Memory.",
      content_markdown: `# Class 8 English: Honeydew & Radiance
## 1. Core Chapters
- **The Best Christmas Present in the World (Michael Morpurgo)**:
  - Jim Macpherson's letter from British trenches describing the 1914 Christmas football match with German soldiers; peace triumphing over war.
- **Glimpses of the Past**: Pictorial narrative of British Raj (1757 to 1857), social evils (untouchability, child marriage), Raja Ram Mohan Roy, and the first war of independence.

## 2. Grammar: Reported Speech (Direct to Indirect)
- Direct: He said, "I am studying."
- Indirect: He said that he was studying.
- Pronoun & tense shifting rules: Present Continuous -> Past Continuous; Simple Present -> Simple Past.`,
      file_url: "https://ncert.nic.in/textbook.php?hhen1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+8+english+honeydew+full+playlist",
      video_title: "Class 8 English Honeydew Full Video Classes",
      upload_date: "2026-09-08",
      author: "Sunita Verma"
    },
    {
      id: "res-c08-mat",
      title: "Class 8 Mathematics - परिमेय संख्याएँ, वर्ग-वर्गमूल एवं बीजीय व्यंजक",
      title_hindi: "गणित कक्षा 8: परिमेय संख्याएँ, एक चर वाले रैखिक समीकरण, चतुर्भुज व गुणनखंड",
      subject_id: "sub-mat",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Mathematics",
      class_name: "Class 8-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'गणित कक्षा 8' & NCERT 'Mathematics 8'",
      resource_type: "formula_sheet",
      description: "परिमेय संख्याएँ (Rational Numbers), वर्ग और वर्गमूल (Square roots by prime factorization & long division), घन और घनमूल, राशियों की तुलना (चक्रवृद्धि ब्याज CI), बीजीय सर्वसमिकाएँ।",
      content_markdown: `# कक्षा 8 गणित: सर्वसमिकाएँ एवं फॉर्मूले
## 1. बीजीय सर्वसमिकाएँ (Algebraic Identities)
- (a + b)² = a² + 2ab + b²
- (a - b)² = a² - 2ab + b²
- (a + b)(a - b) = a² - b²
- (x + a)(x + b) = x² + (a + b)x + ab

## 2. चक्रवृद्धि ब्याज (Compound Interest)
- मिश्रधन A = P × (1 + R/100)ⁿ
- चक्रवृद्धि ब्याज CI = A - P
- साधारण ब्याज SI = (P × R × T) / 100

## 3. चतुर्भुजों के कोण योग गुणधर्म
- चतुर्भुज के चारों अंतःकोणों का योग = 360°
- n-भुजाओं वाले बहुभुज के अंतःकोणों का योग = (n - 2) × 180°`,
      file_url: "https://ncert.nic.in/textbook.php?hhmh1=0-16",
      video_url: "https://www.youtube.com/results?search_query=class+8+maths+full+syllabus+hindi+ncert",
      video_title: "Class 8 Maths Full Course Video Tutorials (Hindi)",
      upload_date: "2026-09-08",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c08-sci",
      title: "Class 8 Science - दहन और ज्वाला, धातु एवं अधातु, सूक्ष्मजीव व कोशिका",
      title_hindi: "विज्ञान कक्षा 8: धातु व अधातु के रासायनिक गुण, कोशिका संरचना, घर्षण एवं प्रकाश",
      subject_id: "sub-sci",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Science",
      class_name: "Class 8-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "SCERT Bihar 'विज्ञान कक्षा 8' & NCERT 'Science 8'",
      resource_type: "chapter_notes",
      description: "धातु एवं अधातु (आघातवर्धनीयता, तन्यता, चालकता, अम्ल से क्रिया), दहन के प्रकार व अग्निशामक, कोशिका - संरचना एवं प्रकार्य (पादप vs जंतु कोशिका), सूक्ष्मजीव (मित्र एवं शत्रु)।",
      content_markdown: `# कक्षा 8 विज्ञान: मुख्य वैज्ञानिक संकल्पनाएँ
## 1. धातु एवं अधातु (Metals and Non-metals)
- **आघातवर्धनीयता (Malleability)**: पीटकर पतली चादर बनाना (सोना व चाँदी सर्वाधिक आघातवर्धनीय)।
- **तन्यता (Ductility)**: खींचकर पतले तार बनाना।
- धातु + अम्ल -> लवण + हाइड्रोजन गैस (H₂ गैस पॉप ध्वनि के साथ जलती है)।
- अपवाद: पारा (Mercury) कमरे के ताप पर द्रव धातु है; सोडियम व पोटैशियम इतने मुलायम हैं कि चाकू से काटे जा सकते हैं।

## 2. कोशिका (Cell Structure)
- कोशिका की खोज: रॉबर्ट हुक ने 1665 में कॉर्क में की।
- कोशिका का पावरहाउस: माइटोकॉन्ड्रिया (Mitochondria - ATP निर्माण)।
- पादप कोशिका में कोशिका भित्ति (Cell Wall) और क्लोरोप्लास्ट पाए जाते हैं, जो जंतु कोशिका में नहीं होते।

## 3. घर्षण (Friction)
- घर्षण गति का विरोध करता है।
- स्थितिज घर्षण > सर्पी घर्षण > लोटनिक घर्षण (Rolling Friction)।
- बॉल बेयरिंग का उपयोग लोटनिक घर्षण द्वारा ऊर्जा हानि घटाने हेतु किया जाता है।`,
      file_url: "https://ncert.nic.in/textbook.php?hhsc1=0-18",
      video_url: "https://www.youtube.com/results?search_query=class+8+science+full+course+hindi+ncert",
      video_title: "Class 8 Science Complete Lectures in Hindi",
      upload_date: "2026-09-08",
      author: "Dr. Arvind Pathak"
    },
    {
      id: "res-c08-sst",
      title: "Class 8 Social Science - आधुनिक भारत, संसाधन एवं भारतीय संविधान",
      title_hindi: "सामाजिक विज्ञान 8: 1857 का विप्लव, भारतीय संविधान, धर्मनिरपेक्षता व न्यायपालिका",
      subject_id: "sub-sst",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Social Science",
      class_name: "Class 8-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'हमारा इतिहास 3', 'हमारी दुनिया 3', 'सामाजिक व राजनीतिक जीवन 3'",
      resource_type: "chapter_notes",
      description: "प्लासी का युद्ध (1757) एवं बक्सर का युद्ध (1764 - बिहार), 1857 का महाविद्रोह, भारतीय संविधान के मौलिक अधिकार, धर्मनिरपेक्षता, न्यायपालिका की स्वतंत्रता।",
      content_markdown: `# कक्षा 8 सामाजिक विज्ञान: इतिहास, भूगोल एवं नागरिक शास्त्र
## 1. इतिहास: ईस्ट इंडिया कंपनी का विस्तार
- **बक्सर का युद्ध (1764)**: मीर कासिम, शुजाउद्दौला और शाह आलम द्वितीय की संयुक्त सेना को हेक्टर मुनरो ने हराया; कंपनी को बंगाल, बिहार और उड़ीसा की दीवानी मिली (इलाहाबाद की संधि 1765)।
- 1857 का विद्रोह: चर्बी वाले कारतूस के विरोध में मंगल पांडे (बैरकपुर); दिल्ली में बहादुर शाह जफर; बिहार में बाबू वीर कुंवर सिंह।

## 2. नागरिक शास्त्र: भारतीय संविधान के 6 मौलिक अधिकार
1. समानता का अधिकार (अनुच्छेद 14-18)
2. स्वतंत्रता का अधिकार (अनुच्छेद 19-22)
3. शोषण के विरुद्ध अधिकार (अनुच्छेद 23-24)
4. धार्मिक स्वतंत्रता का अधिकार (अनुच्छेद 25-28)
5. संस्कृति और शिक्षा संबंधी अधिकार (अनुच्छेद 29-30)
6. संवैधानिक उपचारों का अधिकार (अनुच्छेद 32 - डॉ. अम्बेडकर ने इसे 'संविधान की आत्मा' कहा)।`,
      file_url: "https://ncert.nic.in/textbook.php?hhss1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+8+social+science+full+syllabus+hindi",
      video_title: "Class 8 Social Science Complete NCERT Lectures",
      upload_date: "2026-09-08",
      author: "Vikramaditya Roy"
    },
    {
      id: "res-c08-san",
      title: "Class 8 Sanskrit - अमृता भाग-3: सुभाषितानि, संधि व प्रत्यय",
      title_hindi: "अमृता भाग-3: यक्ष-युधिष्ठिर संवाद, स्वर व व्यंजन संधि, क्त्वा/तुमुन् प्रत्यय",
      subject_id: "sub-san",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Sanskrit",
      class_name: "Class 8-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'अमृता भाग-3' कक्षा 8 & NCERT 'रुचिरा भाग-3'",
      resource_type: "chapter_notes",
      description: "यक्ष-युधिष्ठिर संवाद (महाभारत), नीति श्लोक, स्वर संधि (दीर्घ, गुण, वृद्धि, यण्), प्रत्यय (क्त्वा, ल्यप्, तुमुन्) एवं संस्कृत निबंध।",
      content_markdown: `# कक्षा 8 संस्कृत: अमृता भाग-3
## 1. यक्ष-युधिष्ठिर संवाद
- यक्ष प्रश्न: 'किं स्विद् गुरुतरं भूमेः? किं स्विद् उच्चतरं च खात्?'
- युधिष्ठिर उत्तर: 'माता गुरुतरा भूमेः, खात् पितोच्चतरस्तथा। मनः शीघ्रतरं वातात्, चिन्ता बहुतरी तृणात्॥'
  - भावार्थ: माता भूमि से भारी है, पिता आकाश से ऊँचे हैं। मन वायु से भी तेज है और चिंता तिनके से भी अधिक जलाने वाली है।

## 2. महत्वपूर्ण प्रत्यय (Suffixes)
- **क्त्वा प्रत्यय (करके)**: पठ् + क्त्वा = पठित्वा (पढ़कर); गम् + क्त्वा = गत्वा (जाकर)।
- **तुमुन् प्रत्यय (के लिए)**: पठ् + तुमुन् = पठितुम् (पढ़ने के लिए); गम् + तुमुन् = गन्तुम् (जाने के लिए)।`,
      file_url: "https://ncert.nic.in/textbook.php?hhsk1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+8+sanskrit+ruchira+all+chapters",
      video_title: "Class 8 Sanskrit Ruchira / Amrita Complete Guide",
      upload_date: "2026-09-08",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c08-cs",
      title: "Class 8 Computer Science - पायथन प्रोग्रामिंग व साइबर सुरक्षा",
      title_hindi: "कंप्यूटर 8: पायथन कोड (Variables, Loops, If-Else) एवं डेटा सुरक्षा",
      subject_id: "sub-cs",
      class_id: "c-08",
      grade_level: 8,
      subject_name: "Computer Science",
      class_name: "Class 8-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "State Board Digital Literacy Class 8 & NCERT ICT",
      resource_type: "solution_guide",
      description: "Python प्रोग्रामिंग की मूल बातें (print, input, variables, if-else conditional statements, for loop), साइबर एथिक्स एवं बौद्धिक संपदा अधिकार।",
      content_markdown: `# कक्षा 8 कंप्यूटर: Python प्रोग्रामिंग मूल सिद्धांत
1. **पायथन सिंटैक्स**:
\`\`\`python
# पहला पायथन प्रोग्राम
print("नमस्ते, गिद्धौर सेन्ट्रल स्कूल!")

# इनपुट व चर
marks = int(input("अपने प्राप्तांक दर्ज करें (0-100): "))
if marks >= 60:
    print("प्रथम श्रेणी (First Division) उत्तीर्ण!")
elif marks >= 45:
    print("द्वितीय श्रेणी (Second Division)!")
else:
    print("अभ्यास की आवश्यकता है।")

# लूप (Loop)
for i in range(1, 6):
    print(f"छात्र रोल नंबर: 100{i}")
\`\`\`
2. **साइबर सुरक्षा**:
   - Two-Factor Authentication (2FA) का महत्व।
   - बौद्धिक संपदा अधिकार (Copyright & Plagiarism)।`,
      file_url: "https://ncert.nic.in/ict-curriculum.php",
      video_url: "https://www.youtube.com/results?search_query=class+8+python+programming+basics+hindi",
      video_title: "Class 8 Python Programming Basics in Hindi",
      upload_date: "2026-09-08",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 9 (कक्षा 9)
    // ==========================================
    {
      id: "res-c09-hin",
      title: "Class 9 Hindi - गोधूलि भाग-1 व वर्णिका भाग-1 (BSEB)",
      title_hindi: "गोधूलि भाग-1: कहानी का प्लॉट, भारत का पुरातन विद्यापीठ (नालंदा), ग्राम गीत का मर्म",
      subject_id: "sub-hin",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Hindi",
      class_name: "Class 9-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook Publishing Corp 'गोधूलि भाग-1' & 'वर्णिका भाग-1'",
      resource_type: "chapter_notes",
      description: "शिवपूजन सहाय रचित 'कहानी का प्लॉट' (मुंशी जी और भगजोगनी), डॉ. राजेन्द्र प्रसाद लिखित 'भारत का पुरातन विद्यापीठ : नालंदा', लक्ष्मी नारायण सुधांशु का 'ग्राम गीत का मर्म' एवं पद-परिचय।",
      content_markdown: `# कक्षा 9 हिंदी: गोधूलि भाग-1 (BSEB बिहार बोर्ड)
## 1. गद्य खंड मुख्य पाठ
- **कहानी का प्लॉट (शिवपूजन सहाय)**:
  - बिहार के ग्रामीण समाज में नारी की दयनीय स्थिति; तिलोक और दहेज प्रथा पर मर्मभेदी व्यंग्य।
  - मुंशी जी की गरीबी और उनकी रूपवती बेटी भगजोगनी की विषम विवाह त्रासदी।
- **भारत का पुरातन विद्यापीठ : नालंदा (डॉ. राजेन्द्र प्रसाद)**:
  - स्वतंत्र भारत के प्रथम राष्ट्रपति द्वारा नालंदा के ऐतिहासिक गौरव का वर्णन।
  - एशिया भर से छात्रों का आगमन, शीलभद्र कुलपति, धर्मगंज पुस्तकालय (रत्नसागर, रत्नोदधि, रत्नरंजक)।
- **ग्राम गीत का मर्म (डॉ. लक्ष्मी नारायण सुधांशु)**:
  - लोकगीत और ग्राम गीतों में मानवीय भावनाओं का स्वाभाविक प्रकटीकरण; जीवन के सुख-दुख का संगीत।

## 2. व्याकरण (BSEB मैट्रिक पैटर्न)
- वाक्य भेद: रचना के आधार पर (सरल, संयुक्त, मिश्र)।
- रस, छंद और अलंकार (अनुप्रास, यमक, श्लेष, उपमा, रूपक)।`,
      file_url: "https://biharboardonline.bihar.gov.in",
      video_url: "https://www.youtube.com/results?search_query=class+9+hindi+godhuli+bihar+board+all+chapters",
      video_title: "Class 9 Hindi Godhuli Complete Bihar Board Syllabus",
      notification_text: "📢 BSEB Class 9 बोर्ड पंजीकरण: अपने आधार कार्ड एवं जन्म प्रमाणपत्र का विवरण विद्यालय कार्यालय में सत्यापित कराएं।",
      upload_date: "2026-09-09",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c09-eng",
      title: "Class 9 English - Panorama Part 1 / BSEB & NCERT Beehive",
      title_hindi: "पैनोरमा भाग-1: धर्म युद्ध (Dharm Juddha), ययाति, द पेस फॉर लिविंग",
      subject_id: "sub-eng",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "English",
      class_name: "Class 9-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook 'Panorama Part 1' & NCERT 'Beehive 9'",
      resource_type: "chapter_notes",
      description: "Dharm Juddha (Padma's question on woman's identity), Yayati (C. Rajagopalachari), A Silent Revolution (SMS messaging), The Fun They Had (Isaac Asimov's mechanical teacher).",
      content_markdown: `# Class 9 English: Panorama Part 1 & Beehive
## 1. Key Prose Analyses
- **Dharm Juddha (Arjun Dev Charan)**:
  - Padma, an educated girl, asks her parents: 'What is the identity of a woman?'
  - A woman is known only through her husband or father; marriage confers an identity only at the cost of her selfhood.
- **The Fun They Had (Isaac Asimov)**:
  - Set in year 2157; Margie and Tommy discover an old printed book about schools where human teachers taught children together in real classrooms.
- **The Sound of Music**: Evelyn Glennie who lost hearing at age 11 became a world-renowned multi-percussionist by sensing vibrations through her body.

## 2. Advanced Grammar: Clauses & Modals
- Relative clauses with who, which, that.
- Modals: can, could, may, might, must, should, ought to.`,
      file_url: "https://ncert.nic.in/textbook.php?iebe1=0-11",
      video_url: "https://www.youtube.com/results?search_query=class+9+english+panorama+part+1+bihar+board",
      video_title: "Class 9 English Panorama Part 1 Full BSEB Syllabus",
      upload_date: "2026-09-09",
      author: "Sunita Verma"
    },
    {
      id: "res-c09-mat",
      title: "Class 9 Mathematics - संख्या पद्धति, बहुपद, निर्देशांक ज्यामिति व हीरोन सूत्र",
      title_hindi: "गणित कक्षा 9: अपरिमेय संख्याएँ, बहुपद गुणनखंड, यूक्लिड ज्यामिति, वृत्त व सांख्यिकी",
      subject_id: "sub-mat",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Mathematics",
      class_name: "Class 9-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "Bihar State Textbook 'गणित 9' & NCERT 'Mathematics 9'",
      resource_type: "formula_sheet",
      description: "संख्या पद्धति (Number Systems), बहुपद (शेषफल एवं गुणनखंड प्रमेय), दो चरों वाले रैखिक समीकरण, निर्देशांक ज्यामिति, रेखाएं एवं कोण, त्रिभुजों की सर्वांगसमता, हीरोन का सूत्र (Heron's Formula)।",
      content_markdown: `# कक्षा 9 गणित: मास्टर फॉर्मूला शीट एवं महत्वपूर्ण प्रमेय
## 1. हीरोन का सूत्र (त्रिभुज का क्षेत्रफल)
- अर्ध-परिमाप s = (a + b + c) / 2
- क्षेत्रफल = √[s(s - a)(s - b)(s - c)]

## 2. महत्वपूर्ण बीजीय सर्वसमिकाएँ
- (a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca
- a³ + b³ = (a + b)(a² - ab + b²)
- a³ - b³ = (a - b)(a² + ab + b²)
- a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca)
- यदि a + b + c = 0 हो, तो a³ + b³ + c³ = 3abc.

## 3. वृत्त के प्रमेय (Circle Theorems)
- वृत्त के केंद्र से जीवा पर डाला गया लंब जीवा को समद्विभाजित करता है।
- एक ही वृत्तखंड के कोण परस्पर बराबर होते हैं।
- अर्धवृत्त का कोण समकोण (90°) होता है।`,
      file_url: "https://ncert.nic.in/textbook.php?iemh1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+9+maths+full+syllabus+hindi+ncert+bihar+board",
      video_title: "Class 9 Maths Full Syllabus Video Course (Hindi)",
      upload_date: "2026-09-09",
      author: "Rajesh Sharma"
    },
    {
      id: "res-c09-sci",
      title: "Class 9 Science - हमारे आस-पास के पदार्थ, कोशिका, गति एवं गुरुत्वाकर्षण",
      title_hindi: "विज्ञान कक्षा 9: परमाणु एवं अणु, ऊतक, न्यूटन के गति नियम व कार्य-ऊर्जा",
      subject_id: "sub-sci",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Science",
      class_name: "Class 9-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "Bihar State Textbook 'विज्ञान 9' & NCERT 'Science 9'",
      resource_type: "chapter_notes",
      description: "पदार्थ की अवस्थाएँ (ठोस, द्रव, गैस, प्लाज्मा, बोस-आइंस्टीन कंडेनसेट), डाल्टन का परमाणु सिद्धांत, कोशिकांग, गति के समीकरण (v=u+at, s=ut+½at², v²=u²+2as), गुरुत्वाकर्षण एवं आर्किमिडीज का सिद्धांत।",
      content_markdown: `# कक्षा 9 विज्ञान: भौतिकी, रसायन विज्ञान एवं जीवविज्ञान
## 1. भौतिकी: गति के समीकरण
1. v = u + at
2. s = ut + ½ at²
3. v² = u² + 2as
- **न्यूटन का दूसरा गति नियम**: F = m × a (बल = द्रव्यमान × त्वरण)।
- **सार्वत्रिक गुरुत्वाकर्षण नियम**: F = G × (m₁ × m₂) / r² (G = 6.67 × 10⁻¹¹ N m²/kg²).

## 2. रसायन विज्ञान: मोल संकल्पना (Mole Concept)
- 1 मोल = 6.022 × 10²³ कण (आवोगाद्रो संख्या Nₐ)।
- द्रव्यमान संरक्षण का नियम: किसी रासायनिक अभिक्रिया में द्रव्यमान न तो निर्मित होता है और न ही नष्ट होता है।

## 3. जीवविज्ञान: ऊतक (Tissues)
- पादप ऊतक: विभज्योतक (Meristematic) एवं स्थायी (पैरेंकाइमा, कोलेंकाइमा, स्क्लेरेंकाइमा, जाइलम, फ्लोएम)।
- जाइलम: जल एवं खनिज का परिवहन करता है।
- फ्लोएम: पत्तियों द्वारा निर्मित भोजन का संवहन करता है।`,
      file_url: "https://ncert.nic.in/textbook.php?iesc1=0-15",
      video_url: "https://www.youtube.com/results?search_query=class+9+science+full+syllabus+hindi+ncert",
      video_title: "Class 9 Science Full NCERT & BSEB Course in Hindi",
      upload_date: "2026-09-09",
      author: "Dr. Arvind Pathak"
    },
    {
      id: "res-c09-sst",
      title: "Class 9 Social Science - फ्रांस की क्रांति, भारत की स्थिति, लोकतंत्र व अर्थशास्त्र",
      title_hindi: "सामाजिक विज्ञान 9: 1789 फ्रांसीसी क्रांति, भारत का भौतिक स्वरूप, पालमपुर गाँव की कहानी",
      subject_id: "sub-sst",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Social Science",
      class_name: "Class 9-A",
      board: "Bihar Board (BSEB)",
      book_reference: "SCERT Bihar 'इतिहास की दुनिया 1', 'भारत : भूमि एवं लोग 1', 'लोकतांत्रिक राजनीति 1'",
      resource_type: "chapter_notes",
      description: "फ्रांस की क्रांति (1789), नाजीवाद और हिटलर का उदय, भारत - आकार और स्थिति (82°30' पू. मानक याम्योत्तर), लोकतंत्र क्या और क्यों?, पालमपुर की कहानी (उत्पादन के कारक)।",
      content_markdown: `# कक्षा 9 सामाजिक विज्ञान: इतिहास, भूगोल, नागरिक शास्त्र व अर्थशास्त्र
## 1. इतिहास: फ्रांस की क्रांति (1789)
- 14 जुलाई 1789: बास्तील के किले का पतन (निरंकुश राजतंत्र का प्रतीक)।
- तीन एस्टेट्स: प्रथम (पादरी), द्वितीय (कुलीन), तृतीय (व्यापारी, किसान, मजदूर - केवल यही कर देते थे)।
- नारा: स्वतंत्रता, समानता और बंधुत्व (Liberty, Equality, Fraternity)।

## 2. भूगोल: भारत की स्थिति एवं विस्तार
- अक्षांशीय विस्तार: 8°4' उत्तर से 37°6' उत्तर।
- देशांतरीय विस्तार: 68°7' पूर्व से 97°25' पूर्व।
- भारत की मानक मध्याह्न रेखा (Standard Meridian): 82°30' पूर्व देशांतर (मिर्जापुर, उत्तर प्रदेश) - GMT से 5 घंटे 30 मिनट आगे।

## 3. अर्थशास्त्र: उत्पादन के चार कारक
1. भूमि (Land) - प्राकृतिक संसाधन
2. श्रम (Labour) - कार्य करने वाले लोग
3. भौतिक पूँजी (Physical Capital) - स्थायी (मशीन, भवन) एवं कार्यशील (कच्चा माल, नकदी)
4. मानव पूँजी (Human Capital) - ज्ञान और उद्यम`,
      file_url: "https://ncert.nic.in/textbook.php?iess1=0-5",
      video_url: "https://www.youtube.com/results?search_query=class+9+social+science+full+syllabus+hindi",
      video_title: "Class 9 Social Science Full Course (BSEB/NCERT)",
      upload_date: "2026-09-09",
      author: "Vikramaditya Roy"
    },
    {
      id: "res-c09-san",
      title: "Class 9 Sanskrit - पीयूषम् प्रथमो भागः (BSEB)",
      title_hindi: "पीयूषम् भाग-1: ईश स्तुति, नीतिपद्यानि, लोभः पापस्य कारणम् एवं संस्कृत अनुवाद",
      subject_id: "sub-san",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Sanskrit",
      class_name: "Class 9-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook Publishing Corp 'पीयूषम् प्रथमो भागः'",
      resource_type: "chapter_notes",
      description: "ईश वन्दना, नीतिपद्यानि (भर्तृहरि के नीतिशतक से), यक्ष-युधिष्ठिर संवाद, लोभः पापस्य कारणम् (हितोपदेश), कारक-विभक्ति एवं 10 अंकों का हिंदी-संस्कृत अनुवाद।",
      content_markdown: `# कक्षा 9 संस्कृत: पीयूषम् प्रथमो भागः (बिहार बोर्ड)
## 1. प्रमुख पाठ
- **पाठ 1: ईश वन्दना (उपनिषदों से)**:
  - 'यतो वाचो निवर्तन्ते अप्राप्य मनसा सह...' परमपिता परमात्मा की सर्वव्यापकता।
- **पाठ 3: यक्ष-युधिष्ठिर संवाद**:
  - 'किं नु हित्वा प्रियो भवति, किं नु हित्वा न शोचति?'
  - मानं हित्वा प्रियो भवति, कामं हित्वा न शोचति (अहंकार छोड़कर मनुष्य सबका प्रिय होता है)।

## 2. हिंदी से संस्कृत अनुवाद के 5 प्रमुख नियम
1. कर्ता जिस पुरुष और वचन का होगा, क्रिया भी उसी पुरुष और वचन की होगी।
2. कर्म कारक में द्वितीया विभक्ति होती है (सः पुस्तकं पठति)।
3. 'सह' (साथ) के योग में तृतीया विभक्ति होती है (रामेण सह सीता वनम् अगच्छत्)।
4. 'दा' (देना) धातु के योग में चतुर्थी विभक्ति होती है (राजा निर्धनाय धनं ददाति)।
5. 'भी' (डरना) और 'रक्ष्' (बचाना) में पंचमी विभक्ति होती है (बालकः चोरात् बिभेति)।`,
      file_url: "https://biharboardonline.bihar.gov.in",
      video_url: "https://www.youtube.com/results?search_query=class+9+sanskrit+piyusham+bihar+board+all+chapters",
      video_title: "Class 9 Sanskrit Piyusham Full Bihar Board Lectures",
      upload_date: "2026-09-09",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c09-cs",
      title: "Class 9 Computer Science - कंप्यूटर फंडामेंटल्स एवं डेटाबेस बेसिक्स",
      title_hindi: "कंप्यूटर 9: कंप्यूटर आर्किटेक्चर, SQL बेसिक्स एवं पायथन डेटा स्ट्रक्चर",
      subject_id: "sub-cs",
      class_id: "c-09",
      grade_level: 9,
      subject_name: "Computer Science",
      class_name: "Class 9-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "NCERT Class 9 Computer Science & IT Code 402",
      resource_type: "solution_guide",
      description: "मेमोरी यूनिट्स (Bit, Byte, KB, MB, GB, TB), ऑपरेटिंग सिस्टम के कार्य, रिलेशनल डेटाबेस (RDBMS - Table, Primary Key), SQL SELECT क्वेरी।",
      content_markdown: `# कक्षा 9 कंप्यूटर विज्ञान: कंप्यूटर आर्किटेक्चर एवं डेटाबेस
1. **मेमोरी मापन इकाइयाँ**:
   - 1 Byte = 8 Bits | 1 KB = 1024 Bytes | 1 MB = 1024 KB
   - 1 GB = 1024 MB | 1 TB = 1024 GB
2. **रिलेशनल डेटाबेस (RDBMS)**:
   - **Primary Key**: वह कॉलम जो प्रत्येक रिकॉर्ड को विशिष्ट रूप से पहचानता है (जैसे school_roll_number).
   - **SQL क्वेरी उदाहरण**:
   \`\`\`sql
   SELECT student_name, roll_number, percentage 
   FROM students 
   WHERE class_id = 'c-10' AND percentage >= 75;
   \`\`\``,
      file_url: "https://ncert.nic.in/textbook.php?iett1=0-10",
      video_url: "https://www.youtube.com/results?search_query=class+9+it+402+full+course+hindi",
      video_title: "Class 9 Computer Science & IT Code 402 Full Course",
      upload_date: "2026-09-09",
      author: "Siddharth Kumar"
    },

    // ==========================================
    // CLASS 10 (कक्षा 10 - MATRICULATION BOARD)
    // ==========================================
    {
      id: "res-c10-math-full",
      title: "Class 10 Mathematics Complete Syllabus & Video Roadmap (BSEB Matric & CBSE)",
      title_hindi: "कक्षा 10 गणित: वास्तविक संख्याएँ, त्रिकोणमिति, द्विघात समीकरण, सांख्यिकी (संपूर्ण पाठ्यक्रम)",
      subject_id: "sub-mat",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Mathematics",
      class_name: "Class 10-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "Bihar State Textbook Publishing Corp 'गणित कक्षा 10' & NCERT Class 10 Ganit",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Complete Class 10 Math Syllabus (Ch 1 to Ch 15)",
      notification_text: "📢 BSEB Matric 2026 Alert: Trigonometry (20 Marks) & Coordinate Geometry (10 Marks) carry highest objective weightage.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhU8gD9J8D-iH3FqTzC5pA3f",
      video_title: "Class 10th Math Complete Syllabus One-Shot Lecture Series (Hindi)",
      description: "Complete chapter-by-chapter roadmap covering Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Circles, Constructions, Areas, Surface Areas & Volumes, Statistics, and Probability.",
      content_markdown: `# Class 10 Mathematics: Full Syllabus Master Plan (BSEB Matric & CBSE)

## 📌 Syllabus Structure & Marks Distribution (BSEB 100 Marks / CBSE 80 Marks)
1. **संख्या पद्धति (Number Systems)** - 10 Marks
   - वास्तविक संख्याएं (Real Numbers) - यूक्लिड विभाजन प्रमेयिका, अंकगणित की आधारभूत प्रमेय, अपरिमेय संख्याओं का पुनर्भ्रमण (प्रमाण: √2, √3, √5 अपरिमेय हैं)।
2. **बीजगणित (Algebra)** - 20 Marks
   - बहुपद (Polynomials): शून्यकों का ज्यामितीय अर्थ, विभाजन एल्गोरिथ्म।
   - दो चर वाले रैखिक समीकरण युग्म: प्रतिस्थापन, विलोपन व वज्र-गुणन विधि।
   - द्विघात समीकरण (Quadratic Equations): विविक्तकर (Discriminant D = b² - 4ac) और मूलों की प्रकृति।
   - समांतर श्रेणियाँ (Arithmetic Progressions): nवाँ पद (aₙ = a + (n-1)d), n पदों का योग Sₙ = n/2 [2a + (n-1)d]।
3. **त्रिकोणमिति (Trigonometry)** - 20 Marks
   - त्रिकोणमितीय अनुपात (sin, cos, tan, cot, sec, cosec), विशिष्ट कोणों (0°, 30°, 45°, 60°, 90°) के मान।
   - त्रिकोणमितीय सर्वसमिकाएँ: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ.
   - ऊँचाई एवं दूरी (Applications of Trigonometry): उन्नयन कोण व अवनमन कोण पर आधारित प्रश्न।
4. **नियामक ज्यामिति (Coordinate Geometry)** - 10 Marks
   - दूरी सूत्र d = √[(x₂ - x₁)² + (y₂ - y₁)²], विभाजन सूत्र (Section Formula), त्रिभुज का क्षेत्रफल।
5. **ज्यामिति (Geometry)** - 20 Marks
   - त्रिभुज (Triangles): थेल्स प्रमेय (BPT Theorem) एवं पाइथागोरस प्रमेय का सत्यापन।
   - वृत्त (Circles): वृत्त की स्पर्श रेखा से संबंधित प्रमेय।
6. **क्षेत्रमिति (Mensuration)** - 10 Marks
   - वृत्तों से संबंधित क्षेत्रफल, त्रिज्यखंड व वृत्तखंड।
   - पृष्ठीय क्षेत्रफल और आयतन (ठोसों का संयोजन व रूपांतरण, छिन्नक)।
7. **सांख्यिकी एवं प्रायिकता (Statistics & Probability)** - 10 Marks
   - माध्य (Mean), माध्यक (Median), बहुलक (Mode): संबंध 3 माध्यक = बहुलक + 2 माध्य।

## 🎥 Recommended Videos to Complete Whole Syllabus:
- Unit 1-4 (Real Numbers to AP): Class 10 Full Math Playlist (NCERT/BSEB)
- Unit 5 (Trigonometry Masterclass): Heights & Distances with 20 board questions solved.
- Unit 6 (Geometry & Theorems): Step-by-step proofs of Thales Theorem.`,
      file_url: "https://ncert.nic.in/textbook.php?jemh1=0-14",
      upload_date: "2026-09-15",
      author: "Rajesh Sharma (HOD Mathematics)"
    },
    {
      id: "res-c10-sci-full",
      title: "Class 10 Science Complete Syllabus & Experiments (BSEB & CBSE)",
      title_hindi: "कक्षा 10 विज्ञान: भौतिकी, रसायन विज्ञान व जीवविज्ञान (संपूर्ण मैट्रिक पाठ्यक्रम)",
      subject_id: "sub-sci",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Science",
      class_name: "Class 10-A",
      board: "BSEB & NCERT Aligned",
      book_reference: "Bihar State Textbook Publishing Corp 'विज्ञान कक्षा 10' & NCERT Science 10",
      resource_type: "video_lecture",
      chapter_number: 1,
      chapter_name: "Complete Science Matrix: Physics + Chemistry + Biology (Ch 1 to 16)",
      notification_text: "📢 BSEB Matric 2026 Practical Alert: Practical examination (20 Marks) includes Ray Diagram & Acid-Base Titration.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhW-E47X-W4R9E0qF_mK8Vp7",
      video_title: "Class 10 Science Full Syllabus One-Shot Hindi Lectures",
      description: "Thorough guide covering Chemical Reactions, Acids Bases & Salts, Metals & Non-metals, Carbon Compounds, Life Processes, Control & Coordination, Reproduction, Heredity, Light, Human Eye, Electricity, Magnetism, and Environment.",
      content_markdown: `# Class 10 Science: Full Matric Syllabus & Laboratory Practical Guide

## 🧪 1. रसायन विज्ञान (Chemistry) - 27 Marks
- **रासायनिक अभिक्रियाएँ एवं समीकरण**: संयोजन, वियोजन, विस्थापन, द्विविस्थापन, उपचयन-अपचयन (Redox)।
- **अम्ल, क्षारक एवं लवण**: pH पैमाना (pH < 7 अम्ल, pH = 7 उदासीन, pH > 7 क्षारक), प्लास्टर ऑफ पेरिस (CaSO₄·½H₂O), विरंजक चूर्ण (CaOCl₂), बेकिंग सोडा (NaHCO₃)।
- **धातु एवं अधातु**: सक्रियता श्रेणी, अयस्कों का सांद्रण (भर्जन व निस्तापन), संक्षारण से सुरक्षा।
- **कार्बन एवं उसके यौगिक**: सहसंयोजी आबंध, समावयवता (Isomerism), एल्केन, एल्कीन, एल्काइन, एथेनॉल एवं एथेनॉइक अम्ल, साबुन व अपमार्जक।

## ⚡ 2. भौतिकी (Physics) - 27 Marks
- **प्रकाश का परावर्तन एवं अपवर्तन**: दर्पण सूत्र 1/f = 1/v + 1/u, लेंस सूत्र 1/f = 1/v - 1/u, आवर्धन m, लेंस की क्षमता P = 1/f(m) (डायोप्टर D)।
- **मानव नेत्र एवं रंगबिरंगा संसार**: दृष्टि दोष (निकट दृष्टि - अवतल लेंस; दूर दृष्टि - उत्तल लेंस), प्रकाश का प्रकीर्णन (आकाश का नीला रंग, सूर्योदय के समय लालिमा)।
- **विद्युत**: ओम का नियम V = IR, प्रतिरोधों का श्रेणीक्रम R = R₁ + R₂ + R₃, समांतर क्रम 1/R = 1/R₁ + 1/R₂ + 1/R₃, जूल का तापन नियम H = I²Rt.
- **विद्युत धारा का चुंबकीय प्रभाव**: फ्लेमिंग का वाम-हस्त नियम, विद्युत मोटर एवं विद्युत जनित्र सिद्धांत।

## 🧬 3. जीवविज्ञान (Biology) - 26 Marks
- **जैव प्रक्रम**: पोषण (अमीबा, मानव पाचन तंत्र), श्वसन (वायवीय व अवायवीय), वहन (मानव हृदय का दोहरा परिसंचरण), उत्सर्जन (वृक्क - नेफ्रॉन की संरचना)।
- **नियंत्रण एवं समन्वय**: तंत्रिका कोशिका (न्यूरॉन), मानव मस्तिष्क (प्रमस्तिष्क, अनुमस्तिष्क, मेडुला), पादप हार्मोन (ऑक्सिन, जिबरेलिन, साइटोकाइनिन, एब्सिसिक एसिड)।
- **जीव जनन कैसे करते हैं**: अलैंगिक (विखंडन, मुकुलन, पुनर्जनन), मानव प्रजनन तंत्र।`,
      file_url: "https://ncert.nic.in/textbook.php?jesc1=0-16",
      upload_date: "2026-09-15",
      author: "Dr. Arvind Pathak (Principal & Head of Science)"
    },
    {
      id: "res-c10-sst-full",
      title: "Class 10 Social Science Complete Syllabus (BSEB Matric 100 Marks)",
      title_hindi: "कक्षा 10 सामाजिक विज्ञान: इतिहास, भूगोल, राजनीति विज्ञान व अर्थशास्त्र",
      subject_id: "sub-sst",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Social Science",
      class_name: "Class 10-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook 'इतिहास की दुनिया 2', 'भारत : संसाधन एवं उपयोग 2', 'लोकतांत्रिक राजनीति 2', 'हमारी अर्थव्यवस्था 2'",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "History + Geography + Political Science + Economics + Disaster Management",
      notification_text: "📢 BSEB Board Special: 80 Objective Questions will be asked; any 40 to be answered on OMR Sheet.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhU2tY45OaQ5jFkL9B8h9V8b",
      video_title: "Class 10 Social Science Full One-Shot Lectures (Hindi)",
      description: "Complete guide covering Nationalism in Europe, Nationalism in India (Champaran Satyagraha), Resources & Mineral wealth, Co-operative systems, Democracy, and Disaster Management (Floods in North Bihar).",
      content_markdown: `# Class 10 Social Science: Comprehensive Bihar Board Matric Master Guide

## 🏛️ 1. इतिहास (History) - 20 Marks
- **यूरोप में राष्ट्रवाद**: 1830 व 1848 की फ्रांसीसी क्रांति, इटली का एकीकरण (मेजिनी, काउंट काबूर, गैरीबाल्डी), जर्मनी का एकीकरण (बिस्मार्क - रक्त और लौह की नीति)।
- **भारत में राष्ट्रवाद**:
  - बिहार के चंपारण में यूरोपीय नीलहों द्वारा किसानों पर लागू 'तीनकठिया प्रणाली' (प्रति बीघे 3 कट्ठा में नील की खेती) के विरुद्ध।
  - राजकुमार शुक्ल के आमंत्रण पर महात्मा गांधी का चंपारण आगमन (1917); गांधी जी का भारत में प्रथम सफल सत्याग्रह।
  - असहयोग आंदोलन (1920-22): डॉ. राजेन्द्र प्रसाद, मौलाना मजहरुल हक का योगदान; 'सदाकत आश्रम' की स्थापना।
  - भारत छोड़ो आंदोलन (1942): 11 अगस्त 1942 को पटना सचिवालय पर तिरंगा फहराते हुए 7 अमर छात्रों की शहादत। जयप्रकाश नारायण द्वारा 'आजाद दस्ता' का गठन।

## 🌍 2. भूगोल (Geography) - 20 Marks
- **संसाधन एवं विकास**: 'संसाधन होते नहीं, बनते हैं' (जिम्मरमैन)।
- **जल संसाधन**: कोसी बहुउद्देशीय परियोजना (बिहार का शोक), भाखड़ा नांगल, हीराकुंड।
- **कृषि**: खरीफ (धान, मक्का), रबी (गेहूँ, चना, सरसों), जायद (तरबूज, खीरा)।

## ⚖️ 3. लोकतांत्रिक राजनीति (Civics) - 17 Marks
- लोकतंत्र जनता का, जनता के द्वारा और जनता के लिए शासन है (अब्राहम लिंकन)।
- संघ सूची (97 विषय), राज्य सूची (66 विषय), समवर्ती सूची (47 विषय)।
- राजनीतिक दलों को लोकतंत्र का प्राण कहा जाता है।

## 💰 4. हमारी अर्थव्यवस्था (Economics) - 17 Marks
- 'बिहार के विकास के बिना भारत का विकास संभव नहीं है' - डॉ. एपीजे अब्दुल कलाम।
- प्राथमिक क्षेत्र (कृषि, पशुपालन), द्वितीयक क्षेत्र (उद्योग), तृतीयक क्षेत्र (सेवा क्षेत्र - बैंकिंग, बीमा, शिक्षा)।
- प्रति व्यक्ति आय (PCI) = राष्ट्रीय आय / कुल जनसंख्या।

## 🌊 5. आपदा प्रबंधन (Disaster Management) - 6 Marks
- उत्तरी बिहार में बाढ़ (कोसी, गंडक, बागमती) एवं दक्षिणी बिहार में सुखाड़ की समस्या।`,
      file_url: "https://biharboardonline.bihar.gov.in/matric-sst",
      upload_date: "2026-09-10",
      author: "Vikramaditya Roy"
    },
    {
      id: "res-c10-hin-full",
      title: "Class 10 Hindi Complete Syllabus (गोधूलि भाग-2 व वर्णिका भाग-2)",
      title_hindi: "कक्षा 10 हिंदी: गोधूलि भाग-2 (गद्य व पद्य खंड) एवं वर्णिका भाग-2 (संपूर्ण मैट्रिक)",
      subject_id: "sub-hin",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Hindi",
      class_name: "Class 10-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook Publishing Corp 'गोधूलि भाग-2' एवं 'वर्णिका भाग-2'",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "All 24 Chapters: Godhuli + Varnika + Vyakaran",
      notification_text: "📢 BSEB Hindi Pattern: 50 Objective Marks + 50 Subjective (Essay, Letter, Passage, Q&A).",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhVn0wD_e6n7u5O-T3h5p7m2",
      video_title: "Class 10 Hindi Godhuli & Varnika One-Shot Revision Series",
      description: "Complete study of Dr. B.R. Ambedkar (Shram Vibhajan), Nalin Vilochan Sharma (Vish ke Daant), Max Mueller, Hazariprasad Dwivedi, Magamma, Dharti Kab Tak Ghumegi, and complete grammar.",
      content_markdown: `# Class 10 Hindi: Godhuli & Varnika Complete Board Notes

## 📖 1. गोधूलि भाग-2 गद्य खंड
1. **श्रम विभाजन और जाति प्रथा (डॉ. भीमराव अम्बेडकर)**:
   - लेखक के अनुसार जाति प्रथा श्रम विभाजन के साथ-साथ श्रमिक विभाजन का भी रूप ले चुकी है।
   - आदर्श समाज के तीन तत्व: स्वतंत्रता, समता और भ्रातृत्व।
2. **विष के दाँत (नलिन विलोचन शर्मा)**:
   - मध्यमवर्गीय परिवार में लिंग भेद और खोखा (कासू) के लाड़-प्यार का परिणाम; मदन द्वारा कासू के दो दाँत तोड़ना।
3. **भारत से हम क्या सीखें (मैक्स मूलर)**:
   - भारत की ज्ञान-परंपरा, भू-विज्ञान, वनस्पति, भाषा विज्ञान और नीति कथाओं की समृद्ध विरासत।
4. **नाखून क्यों बढ़ते हैं (आचार्य हजारीप्रसाद द्विवेदी)**:
   - नाखून मनुष्य की पाशविक वृत्ति के प्रतीक हैं, जबकि उन्हें काटना मनुष्यता की पहचान है।
5. **नागरी लिपि (गुणाकर मुले)**: देवनागरी लिपि का ऐतिहासिक विकास।
6. **बहादुर (अमरकांत)**: नेपाली पहाड़ी बालक बहादुर की ईमानदारी और घरेलू नौकरों के प्रति समाज का संवेदनहीन व्यवहार।

## 📖 2. वर्णिका भाग-2 (पूरक पाठ्यपुस्तक)
1. **दही वाली मंगम्मा (श्रीनिवास)**: सास-बहू के अधिकार की लड़ाई; मंगम्मा का भोलापन।
2. **ढाहते विश्वास (सातकोड़ी होता)**: उड़ीसा में महानदी और देवी नदी की विनाशकारी बाढ़ में ग्रामीणों का संघर्ष।
3. **माँ (ईश्वर पेटलीकर)**: अपनी पागल बेटी मंगु के प्रति माँ का असीम और निश्छल वात्सल्य प्रेम।
4. **नगर (सुजाता)**: मदुरै के सरकारी अस्पताल में वल्ली अम्माल और उसकी बीमार बेटी पाप्पाति का चक्कर।
5. **धरती कब तक घूमेगी (सांवर दइया)**: तीनों बेटों द्वारा बूढ़ी माँ सीता को 50-50 रुपये महीने देने का फैसला; माँ का स्वाभिमान।`,
      file_url: "https://biharboardonline.bihar.gov.in/matric-hindi",
      upload_date: "2026-09-10",
      author: "Manoj Kumar Mishra"
    },
    {
      id: "res-c10-eng-full",
      title: "Class 10 English Complete Syllabus (Panorama Part 2)",
      title_hindi: "कक्षा 10 अंग्रेजी: पैनोरमा भाग-2 (The Pace for Living, Gillu, Once Upon a Time)",
      subject_id: "sub-eng",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "English",
      class_name: "Class 10-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook 'Panorama Part 2' (Class 10 BSEB)",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "Complete Panorama Prose, Poetry and Composition",
      notification_text: "📢 BSEB English Note: Although English marks are not added to Matric aggregate, passing is necessary for admission.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhW3gY_4k7_o0f8o-n3e9l2p",
      video_title: "Class 10 English Panorama Part 2 All Chapters & Grammar",
      description: "Comprehensive notes covering R.C. Hutchinson, John Lexau, Mahadevi Varma (Gillu), Satyajit Ray, Toni Morrison, Alexander Pope, Vidyapati (The Empty Heart), and grammar rules.",
      content_markdown: `# Class 10 English: Panorama Part 2 Complete Study Material

## 📝 1. Prose Section
1. **The Pace for Living (R.C. Hutchinson)**:
   - Fast life in contemporary Western world; an Irish corn merchant in Dublin bewildered by modern speeds. Slow thinkers are handicapped in earning a living.
2. **Me and the Ecology Bit (John Lexau)**:
   - Narrator Jim tries to convince neighbours (Mr. Williams, Ms. Greene, Mr. Johnson) to preserve trees and save paper, but finds everyone gives advice while nobody practices ecology.
3. **Gillu (Mahadevi Varma)**:
   - Touching relationship between author and a tiny wounded baby squirrel; Gillu's playful antics and final resting place under Sonjuhi creeper.
4. **What is Wrong with Indian Films? (Satyajit Ray)**:
   - Critique of cliché visual patterns in Hindi cinema; plea for maturity, authentic Indian stories, and technical refinement.
5. **Once Upon a Time (Toni Morrison)**:
   - Nobel laureate speech; allegorical story of an old, blind, wise woman holding a bird in hand representing the responsibility of language.

## ✍️ 2. Grammar & Composition
- Formal letter writing, Paragraph composition, Notice writing.
- Active & Passive voice conversion, Direct & Indirect narration.`,
      file_url: "https://biharboardonline.bihar.gov.in/matric-english",
      upload_date: "2026-09-10",
      author: "Sunita Verma"
    },
    {
      id: "res-c10-san-full",
      title: "Class 10 Sanskrit Complete Syllabus (पीयूषम् द्वितीयो भागः)",
      title_hindi: "कक्षा 10 संस्कृत: पीयूषम् भाग-2 (मंगलम्, पाटलिपुत्रवैभवम्, अलसकथा, कर्णस्य दानवीरता)",
      subject_id: "sub-san",
      class_id: "c-10",
      grade_level: 10,
      subject_name: "Sanskrit",
      class_name: "Class 10-A",
      board: "Bihar Board (BSEB)",
      book_reference: "Bihar State Textbook Publishing Corp 'पीयूषम् द्वितीयो भागः' कक्षा 10",
      resource_type: "chapter_notes",
      chapter_number: 1,
      chapter_name: "All 14 Chapters + Vyakaran (Sandhi, Samas, Karak, Pratyay, Anuvad)",
      notification_text: "📢 BSEB Sanskrit 100 Marks: High scoring subject; complete chapter questions are asked directly in Hindi.",
      video_url: "https://www.youtube.com/playlist?list=PLVLoWQFkZbhX5k3_9z0d8_7n2e1_m3p5r",
      video_title: "Class 10 Sanskrit Piyusham Part 2 Full Revision Course",
      description: "Mangalam, Patliputra Vaibhavam, Alaskatha, Sanskrit Sahitya Lekhika, Bharat Mahima, Bharatiya Samskara, Swami Dayanand, Mandakini Varnanam, Vyaghra Pathika Katha, Karnasya Danavirata, and full grammar.",
      content_markdown: `# Class 10 Sanskrit: Piyusham Part 2 Complete Notes & Grammar

## 📿 1. प्रमुख पाठों का हिन्दी भावार्थ
1. **मंगलम् (उपनिषद)**:
   - 'हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम्। तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये॥' (ईशावास्योपनिषद्)
   - 'सत्यमेव जयते नानृतम्' - सत्य की ही जीत होती है, असत्य की नहीं।
2. **पाटलिपुत्रवैभवम्**:
   - बिहार की राजधानी पटना का ऐतिहासिक वैभव; बुद्ध काल में 'पाटलिग्राम', चंद्रगुप्त मौर्य काल में शोभा ও रक्षा व्यवस्था, सम्राट अशोक के समय 'प्रियदर्शिनः'।
   - सिखों के दसवें गुरु गोविंद सिंह का जन्मस्थल 'तख्त श्री हरिमंदिर जी पटना साहिब'।
3. **अलसकथा (विद्यापति रचित पुरुषपरीक्षा से)**:
   - मिथिला के मंत्री वीरेश्वर द्वारा अनाथों और संकटग्रस्तों को भोजन देना; धूर्तों की पहचान हेतु अलसशाला में आग लगाना।
   - चार वास्तविक आलसियों का संवाद: 'अरे! यह कैसा कोलाहल है?', 'लगता है इस घर में आग लगी है!', 'कोई ऐसा दयावान् नहीं जो भींगे वस्त्र से ढक दे?', 'अरे वाचालों! कितना बोलते हो, चुपचाप क्यों नहीं सोते!'
4. **भारतमहिमा**:
   - 'गायन्ति देवाः किल गीतकानि धन्यास्तु ते भारतभूमिभागे...' देवगण भी भारत भूमि पर जन्म लेने के लिए लालायित रहते हैं।
5. **कर्णस्य दानवीरता (भास रचित कर्णभारम् से)**:
   - इंद्र द्वारा ब्राह्मण वेश में कर्ण से उसके जन्मजात कवच एवं कुंडल दान में माँगना; कर्ण का सहर्ष दान।

## 📜 2. संस्कृत व्याकरण (50 Marks)
- **संधि**: स्वर संधि, व्यंजन संधि, विसर्ग संधि।
- **कारक सूत्र**: 'सहार्थे तृतीया', 'रुच्यर्थानां प्रीयमाणः' (चतुर्थी), 'भीत्रार्थानां भयहेतुः' (पंचमी)।
- **प्रत्यय**: क्त्वा, ल्यप्, तुमुन्, तव्यत्, अनीयर्, क्त, क्तवतु, शतृ, शानच्।`,
      file_url: "https://biharboardonline.bihar.gov.in/matric-sanskrit",
      upload_date: "2026-09-10",
      author: "Manoj Kumar Mishra"
    }
  ];
}
