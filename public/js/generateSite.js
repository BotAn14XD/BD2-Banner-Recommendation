function addBannerRecommendation( jsonData ) {
  const sectionArray = [];

  for( const bannerChar of jsonData[ "banner" ] ) {
    const section = document.createElement( "section" );
    section.classList.add( 'row' );
    section.classList.add( 'pt-2' );
    let content = `
        <div class="col-11 mx-auto bg-body-secondary rounded">
          <div class="row h-100 py-2">
            <div class="col-2 pe-2 border-end border-2">
              <div class="w-100 d-flex justify-content-center">
                <img class="costumeSize" src="./public/images/costumes/${ bannerChar.imgName }.png" title="${ bannerChar.costumeName }" alt="${ bannerChar.costumeName }">
              </div>
            </div>

            <div class="col d-flex flex-column">
              <div class="row border-bottom mx-1 pb-2 border-2">
                <div class="col d-flex justify-content-center">
                  <h1>${ bannerChar.costumeName } ${ bannerChar.charName }</h1>
                </div>
              </div>

              <div class="row flex-grow-1 pt-2">
                <div class="col-3 d-flex align-items-center">
                  <div class="w-100">
                    <ul class="list-unstyled">
                      <li><span><b>Role - </b>${ bannerChar.role }</span></li>
                      <li><span><b>Property - </b><img src="./public/images/${ bannerChar.element }.png" title="${ bannerChar.element }" alt="${ bannerChar.element }" width="32px" height="32px"></span></li>
                      <li><span><b>Damage Type - </b>${ bannerChar.dmgType }</span></li>
                      <br>
                      ${ getBannerDateString( bannerChar.startDate, bannerChar.endDate ) }
                    </ul>
                  </div>
                </div>
                <div class="col-4 d-flex align-items-center">
                  <div class="container-fluid">
                    <div class="row pb-3">
                      <div class="col">
                        <h2>Breakpoints:</h2>
                      </div>
                    </div>
                    <div class="row w-100">
                      <div class="col">
                        <ul class="list-group list-group-flush p-2 border border-3 rounded">
                          ${ getBreakpoints( bannerChar.breakpoints ) }
                        </ul>
                      </div>
                    </div>
                  </div>
        
                </div>
                <div class="col d-flex align-items-center">
                  <div class="container-fluid">
                    <div class="row pb-3">
                      <div class="col">
                        <h2>Should you pull on this banner?</h2>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <p>
                          ${ bannerChar.description }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
    `;
    section.innerHTML = content;
    sectionArray.push( section );
  }
  return sectionArray;
}

function getBannerDateString( start, end ) {
  const startDate = new Date( Date.parse( start ) );
  const endDate = new Date( Date.parse( end ) );
  const periode = `<li>${ startDate.toLocaleDateString() } &#8212; ${ endDate.toLocaleDateString() }</li>`;

  let dateDiff = endDate.getTime() - new Date().getTime();

  const daysLeft = Math.trunc( dateDiff / ( 1000 * 60 * 60 * 24 ) );
  dateDiff %= ( 1000 * 60 * 60 * 24 );

  const hoursLeft = Math.trunc( dateDiff / ( 1000 * 60 * 60 ) );
  dateDiff %= ( 1000 * 60 * 60 );

  const minutesLeft = Math.trunc( dateDiff / ( 1000 * 60 ) );

  let textColor = "text-warning";
  if ( daysLeft < 4 ) {
    textColor = "text-danger"
  }

  const timeLeft = `<li>Banner ends in <span class="${ textColor }">${ daysLeft } D : ${ hoursLeft } h : ${ minutesLeft } min</span> !</li>`;
  return periode + timeLeft;
}

function getBreakpoints( breakpoints ) {
  let breakpointString = "";

  for( const [dupe, comment] of breakpoints ) {
    breakpointString += `<li class="list-group-item"><img class="pe-2" src="./public/images/${ dupe }.png" width="40px" height="32px"> ${ comment }</li>`;
  }
  return breakpointString;
}

async function init() {
  const res = await fetch( "./public/json/data.json" );
  const data = await res.json();

  /** @type { HTMLDivElement } */
  const container = document.getElementById( "main-container" );
  for( const section of addBannerRecommendation( data ) ) {
    container.appendChild( section );
  }
  console.log(data)
}
init();