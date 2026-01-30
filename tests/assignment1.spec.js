const { test, expect } = require('@playwright/test');

// Data Set
const OFFICE_DATA = [
  //POSITIVE SCENARIOS
  { id: 'F2_Pos_01', input: 'mahaththaya aavadha?', expected: 'මහත්තයා ආවද?' },
  { id: 'F2_Pos_02', input: 'oba thumaata sthuthiyi.', expected: 'ඔබ තුමාට ස්තුතියි.' },
  { id: 'F2_Pos_03', input: 'karunaakara idaganda.', expected: 'කරුණාකර ඉඩගන්න.' },
  { id: 'F2_Pos_04', input: 'Excel sheet eka ewanna.', expected: 'Excel sheet එක එවන්න.' },
  { id: 'F2_Pos_05', input: 'api March 31 venidha mudhal gewamu.', expected: 'අපි March 31 වෙනිදා මුදල් ගෙවමු.' },
  { id: 'F2_Pos_06', input: 'boss innavanam mama katha karannam.', expected: 'boss ඉන්නවනම් මම කතා කරන්නම්.' },
  { id: 'F2_Pos_07', input: 'apita salli na.', expected: 'අපිට සල්ලි නෑ.' },
  { id: 'F2_Pos_08', input: 'hari malli ela!', expected: 'හරි මල්ලි එල!' },
  { id: 'F2_Pos_09', input: 'api meeting ekata giyaa.', expected: 'අපි meeting එකට ගියා.' },
  { id: 'F2_Pos_10', input: 'puluwannam report eka hadanna.', expected: 'පුළුවන්නම් report එක හදන්න.' },
  { id: 'F2_Pos_11', input: 'api heta office yamu.', expected: 'අපි හෙට office යමු.' },
  { id: 'F2_Pos_12', input: 'lamayi tika sellam karanawa.', expected: 'ළමයි ටික සෙල්ලම් කරනවා.' },
  { id: 'F2_Pos_13', input: 'sir enawa, api padam karamu.', expected: 'sir එනවා, අපි පාඩම් කරමු.' },
  { id: 'F2_Pos_14', input: 'mokakdha \n prashne?', expected: 'මොකක්ද \n ප්‍රශ්නේ?' },
  { id: 'F2_Pos_15', input: 'mata PDF eka mail karanna.', expected: 'මට PDF එක mail කරන්න.' },
  { id: 'F2_Pos_16', input: 'dura 10 km k thiyenawa.', expected: 'දුර 10 km ක් තියෙනවා.' },
  { id: 'F2_Pos_17', input: 'ganana Rs. 2500 yi.', expected: 'ගණන Rs. 2500 යි.' },
  { id: 'F2_Pos_18', input: 'shree lankaawe aarthikaya pilibadhawa sakachcha kirimata, mudhal amathithumaa saha maha bankuwe adipathithumaa athara visesha hamuwak pavathuna athara, ehi prathipala labaana sathiya thula prakasha kirimata niyamithaya.', expected: 'ශ්‍රී ලංකාවේ ආර්ථිකය පිළිබඳව සකච්ච කිරීමත, මුදල් අමතිතුමා සහ මහ බැංකුවේ අධිපතිතුමා අතර විශේෂ හමුවක් පැවතුන අතර, එහි ප්‍රතිපල ලබන සතිය තුල ප්‍රකාශ කිරීමට නියමිතය.' },
  { id: 'F2_Pos_19', input: 'himin himin yamu.', expected: 'හිමින් හිමින් යමු.' },
  { id: 'F2_Pos_20', input: 'Zoom link eka group ekata daanna.', expected: 'Zoom link එක group එකට දාන්න.' },
  { id: 'F2_Pos_21', input: 'api   wada   karamu.', expected: 'අපි   වැඩ   කරමු.' },
  { id: 'F2_Pos_22', input: 'Galle yanna kochchara wela yanawada?', expected: 'Galle යන්න කොච්චර වෙලා යනවද?' },
  { id: 'F2_Pos_23', input: 'udhe 8.00 AM ta wada patan gannawa.', expected: 'උදේ 8.00 AM ට වැඩ පටන් ගන්නවා.' },
  { id: 'F2_Pos_24', input: 'oba thumaa dakshayek.', expected: 'ඔබ තුමා දක්ෂයෙක්.' },

  //NEGATIVE SCENARIOS
  { id: 'F2_Neg_01', input: 'apiofficeyanawa', expected: 'අපිඔෆ්ෆිcඑයනවා' },
  { id: 'F2_Neg_02', input: 'ganana keeyadha????', expected: 'ගණන කීයද????' },
  { id: 'F2_Neg_03', input: 'mge nama kamal', expected: 'ම්ගේ නම කමල්' },
  { id: 'F2_Neg_04', input: 'site eka https://www.facebook.com', expected: 'site එක https://www.facebook.com' },
  { id: 'F2_Neg_05', input: 'mama email eka check kara.', expected: 'මම email එක check කරා.' },
  { id: 'F2_Neg_06', input: 'sir enawa api yamu', expected: 'sir එනවා අපි යමු' },
  { id: 'F2_Neg_07', input: '     api     yamu     ', expected: '     අපි     යමු     ' },
  { id: 'F2_Neg_08', input: 'mata100k dhenna.', expected: 'මට100ක් දෙන්න.' },
  { id: 'F2_Neg_09', input: 'ApI KaMu', expected: 'අපි කමු'},
  { id: 'F2_Neg_10', input: '', expected: '' },

  //UI SCENARIO
  { id: 'F2_UI_01', input: 'api wada', expected: 'අපි වැඩ' }
];

test.describe('Friend 2 Test Suite', () => {
  test.setTimeout(180000); 

  test('Formal Context Tests', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    const inputField = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputField = page.locator('div.whitespace-pre-wrap').first();

    for (const item of OFFICE_DATA) {
      // Replaced backticks with normal strings to prevent SyntaxError
      console.log('\nRunning: ' + item.id);
      
      await page.keyboard.press('Escape');
      await inputField.fill('');
      
      if (item.input) {
        await inputField.fill(item.input);
      } else {
        await inputField.press('Backspace');
      }

      await page.waitForTimeout(3000);
      const outputText = await outputField.innerText();
      
      if (outputText.trim() === item.expected.trim()) {
        console.log('[PASS] ' + item.input + ' -> ' + outputText);
      } else {
        console.log('[FAIL] Expected: ' + item.expected + ' | Got: ' + outputText);
      }

      expect.soft(outputText.trim()).toBe(item.expected.trim());
    }
  });
});