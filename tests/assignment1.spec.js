const { test, expect } = require('@playwright/test');

// Data Set: 35 Unique Scenarios (Professional + Mixed Context)
const scenarioList = [

  //POSITIVE FUNCTIONAL (24)

  { code: 'F3_Pos_01', in: 'sir kawdhadha enne?', out: 'සර් කවුදද එන්නේ?' },
  { code: 'F3_Pos_02', in: 'karunakara podi kalayak denna.', out: 'කරුණාකර පොඩි කාලයක් දෙන්න.' },
  { code: 'F3_Pos_03', in: 'oyaata loku sthuthi.', out: 'ඔයාට ලොකු ස්තුති.' },
  { code: 'F3_Pos_04', in: 'api adha project eka avasan karamu.', out: 'අපි අද project එක අවසන් කරමු.' },
  { code: 'F3_Pos_05', in: 'manager office ekee innawa.', out: 'manager office එකේ ඉන්නවා.' },
  { code: 'F3_Pos_06', in: 'monthly report eka ready.', out: 'monthly report එක ready.' },
  { code: 'F3_Pos_07', in: 'api heta training ekata yanawa.', out: 'අපි හෙට training එකට යනවා.' },
  { code: 'F3_Pos_08', in: 'customer kenek phone kara.', out: 'customer කෙනෙක් phone කරා.' },
  { code: 'F3_Pos_09', in: 'oyaata meeka therenawadha?', out: 'ඔයාට මේක තේරෙනවද?' },
  { code: 'F3_Pos_10', in: 'mata break ekak onee.', out: 'මට break එකක් ඕනේ.' },

  { code: 'F3_Pos_11', in: 'email eka hariyata yawala.', out: 'email එක හරිට යවලා.' },
  { code: 'F3_Pos_12', in: 'api meeting eka postpone karamu.', out: 'අපි meeting එක postpone කරමු.' },
  { code: 'F3_Pos_13', in: 'oya innawanam mama ennam.', out: 'ඔයා ඉන්නවනම් මම එන්නම්.' },
  { code: 'F3_Pos_14', in: 'mokakdha oyage adahas?', out: 'මොකක්ද ඔයාගේ අදහස?' },
  { code: 'F3_Pos_15', in: 'workload eka podi venawa.', out: 'workload එක පොඩි වෙනවා.' },

  { code: 'F3_Pos_16', in: 'api wada karanne team ekak widihata.', out: 'අපි වැඩ කරන්නේ team එකක් විදිහට.' },
  { code: 'F3_Pos_17', in: 'oyaata puluwanda eka karanna?', out: 'ඔයාට පුළුවන්ද එක කරන්න?' },
  { code: 'F3_Pos_18', in: 'udhe 9.30 AM ta meeting eka.', out: 'උදේ 9.30 AM ට meeting එක.' },
  { code: 'F3_Pos_19', in: 'salary eka heta labenawa.', out: 'salary එක හෙට ලැබෙනවා.' },
  { code: 'F3_Pos_20', in: 'company eke rules follow karanna.', out: 'company එකේ rules follow කරන්න.' },

  { code: 'F3_Pos_21', in: 'oya hari lassanata wada karanawa.', out: 'ඔයා හරි ලස්සනට වැඩ කරනවා.' },
  { code: 'F3_Pos_22', in: 'api   wada   avasan   karamu.', out: 'අපි   වැඩ   අවසන්   කරමු.' },
  { code: 'F3_Pos_23', in: 'Kandy yanney kochchara wela gannawadha?', out: 'Kandy යන්නේ කොච්චර වෙලා ගන්නවද?' },
  { code: 'F3_Pos_24', in: 'document tika upload karanna.', out: 'document ටික upload කරන්න.' },

  //NEGATIVE FUNCTIONAL (9)

  { code: 'F3_Neg_01', in: 'apiwadaavashyai', out: 'අපිවඩඅවශ්‍යයි' },
  { code: 'F3_Neg_02', in: 'mokakda meeka!!!???', out: 'මොකක්ද මේක!!!???' },
  { code: 'F3_Neg_03', in: 'mta wada hari amarui', out: 'ම්ට වැඩ හරි අමාරුයි' },
  { code: 'F3_Neg_04', in: 'ApI wAdA KaRaMu', out: 'අපි වැඩ කරමු' },
  { code: 'F3_Neg_05', in: 'mama report eka submit kala.', out: 'මම report එක submit කළා.' },
  { code: 'F3_Neg_06', in: 'sir enne api balamu', out: 'sir එන්නේ අපි බලමු' },
  { code: 'F3_Neg_07', in: '    wada    karamu    ', out: '    වැඩ    කරමු    ' },
  { code: 'F3_Neg_08', in: 'Rs5000k gewanna.', out: 'Rs5000ක් ගෙවන්න.' },
  { code: 'F3_Neg_09', in: 'portal eka https://portal.company.lk', out: 'portal එක https://portal.company.lk' },

  
  //UI TESTS (2)

  { code: 'F3_UI_01', in: 'api wada', out: 'අපි වැඩ' },
  { code: 'F3_UI_02', in: '' , out: '' }
];

test.describe('Friend 3 – Professional & Mixed Context Suite', () => {

  test.setTimeout(180000);

  test('Translator Validation', async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'load' });

    const textArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    const resultDiv = page.locator('div.whitespace-pre-wrap').first();

    for (const item of scenarioList) {

      console.log(`\n▶ Running: ${item.code}`);

      await page.keyboard.press('Escape');
      await textArea.fill('');

      if (item.in !== '') {
        await textArea.fill(item.in);
      } else {
        await textArea.press('Backspace');
      }

      await page.waitForTimeout(2500);

      const outputText = await resultDiv.innerText();

      console.log(`Input : ${item.in}`);
      console.log(`Output: ${outputText}`);

      expect.soft(outputText.trim()).toBe(item.out.trim());
    }
  });
});
