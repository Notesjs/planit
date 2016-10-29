(function() {
 'use strict';

 angular
    .module('app.flight',[])
    .factory('FlightFactory', FlightFactory)
    .controller('FlightController', FlightController)

 	FlightController.$inject = ['$scope', '$state', 'FlightFactory'];

	function FlightController($scope, $state,FlightFactory){
    var vm = this;
	$scope.arrivalDate = new Date();
    $scope.departureDate = new Date();
    $scope.cities = ["ABR","ABI","CAK","ALS","ABY","ALB","ABQ","AEX","ABE", "AIA","APN","AOO","AMA","ANC","ATW","AVL","ASE","AHN", "ATL","ACY","AGS","AUG","AUS","BFL","BWI","BGR","BHB", "BRW","BTR","BPT","BKW","BED","BLI","BJI","BET","BTT", "BIL","BGM","BHM","BIS","BMI","BMG","BLF","BOI","BOS", "BZN","BKX","BRO","BQK","BUF","BUR","BRL","BBF","BTV", "BTM","CGI","CLD","CNM","CPR","CID","CMI","CHS","CRW", "CLT","CHO","CHA","CYS","MDW","CHI","ORD","CIC", "CVG","CKB","CLE","CVN","COD","CLL","COS","COU","CAE", "CSG","CLU","GTR","OLU","CMH","CDV","CRP","DAL","DFW", "DAY","DAB","DEC","DEN","DSM","DTW","DTT","DVL","DIK", "DLG","DDC","DHN","DUJ","DBQ","DLH","DRO","DUT","EAU", "EEK","IPL","ELD","ELP","EKO","ELM","WDG","ERI","ESC", "EUG","ACV","EVV","FAI","FAR","FMN","XNA","FAY","FLG", "FNT","FLO","FOD","FLL","TBN","RSW","FSM","VPS","FWA", "FYU","FAT","GNV","GCK","GCC","GDV","GFK","GRI","GJT", "GRR","GBD","GTF","GRB","LWB","GSO","GLH","PGV","GSP", "GPT","GUC","HGR","HNM","CMX","HRL","MDT","HRO","BDL", "HVR","HYS","HLN","HIB","Big","HHH","HOB","HOM","HNL", "MKK","HOU","IAH","EFD","HTS","HSV","HON","HYA", "IDA","IND","INL","IYK","IMT","IWD","ISP","ITH","JAC", "JAN","MKL","JAX","OAJ","JMS","JHW","JST","JPR","JLN", "JNU","OGG","AZO","LUP","FCA","MCI","JHM","EAR","ENA", "KTM","EYW","GRK","AKN","IGM","IRK","LMT","TYS","ADQ", "LSE","LFT","LCH","Hll","LNY","LNS","LAN","LAR","LRD", "LRU","LAS","LBE","PIB","LAW","LAB","LWS","LEW","LWT", "LEX","LBL","LIH","LNK","LIT","LGB","GGG","QLA","SDF", "LBB","LYH","MCN","MSN","MHT","MHK","MBL","MWA","MQT", "MVY","MCW","MSS","MFE","MCK","MFR","MLB","MEM","MEI", "MIA","MAF","MLS","MKE","MSP","MOT","MSO","MOB","MOD", "MLI","MLU","MGM","MTJ","MGW","MWH","MSL","MKG", "MRY","ACK","ABF","BNA","EWN","HVN","MSY","LGA","JFK", "NYC","EWR","SWF","PHF","OME","ORF","OTH","LBF","OAK", "OGS","OKC","OMA","ONT","SNA","MCO","OSH","OWB","OXR", "PAH","PGA","PSP","PFN","PKB","PSC","PLN","PDT","PNS", "PIA","PHL","PHX","PIR","SOP","PIT","PIH","PNC","PWM", "PDX","PSM","PRC","PQI","PVD","PVC","PUB","PUW","UIN", "RDU","RAP","RDD","RDM","RNO","RHI","RIC","RIW","ROA", "RST","ROC","RKS","RFD","RKD","ROW","RUT","SMF","MBS", "SLN","SPY","SLC","SJT","SAT","SAN","QSF","SFO","SJC", "SBP","SDP","SBA","SAF","SMX","STS","SLK","SRQ","CIU", "SAV","BFF","SEA","SHD","SHR","SHV","SDY","SVC","SUX", "FSD","SIT","SGY","SBN","GEG","SPI","CEF","SGF","VSF", "STC","SGU","STL","PIE","SCE","SBS","SUN","SRY","TLH", "TPA","TAX","TXK","TVF","OOK","TOL","TOP","TVC","TTN", "TUS","TUL","TUP","TWF","TYR","UNK","EGE","VDZ","VLD", "VCT","VIS","ACT","ALW","DCA","WAS","IAD","ALO","ART", "ATY","CWA","EAT","PBI","WYS","HPN","SPS","ICT","AVP", "IPT","ISN","ILG","ILM","OLF","WRL","WRG","YKM","YAK", "YUM","YXX","YAA","YEK","YBG","YYC","YBL","YGR","YCG", "YYG","YMT","YYQ","YXC","YDF","YHD","YEG","YEO","YMM", "YYE","YXJ","YSM","YFC","YQX","YGP","YQU","YHZ","YHM", "YFB","YKA","YLW","YQK","YGK","YQL","YXU","YXH","YQM", "YYY","YMQ","YUL","YCD","YYB","YOW","YYF","YZT","YPW", "YPR","YQB","YQZ","YRT","YRL","YQR","YRJ","YUY","YSJ", "YZP","YZR","YXE","YAM","YZV","YXL","YYD","YYT","YSB", "YQY","YXT","YTH","YQT","YTS","YYZ","YTO","YTZ","YVO", "YVR","YYJ","YWK","YXY","YWL","YQG","YWG","YZF","LAX"].map(function(state) {
        return {abbrev: state};
      })
    $scope.arrivalCity = '';
    $scope.departureCity = '';
    $scope.flightInfo = []
    $scope.totalPrice =[]

    $scope.getFlight = function(arrivalCity,departureCity,arrivalDate,departureDate){
        FlightFactory.getFlight(arrivalCity,departureCity,arrivalDate,departureDate).then(data=>{
                        console.log('data.data', data.data.legs)
                        data.data.legs.forEach((flight,index)=>{
                            $scope.flightInfo.push({
                                airlineName : flight.segments[0].airlineName,
                                arrivalCity : flight.segments[0].arrivalAirportLocation,
                                arrivalTime : flight.segments[0].arrivalTime,
                                departureCity : flight.segments[0].departureAirportLocation,
                                departureTime : flight.segments[0].departureTime,
                                total: data.data.offers[index].totalFare
                            })
                        })

                })
        setTimeout(()=>{     
        console.log('flightInfo',$scope.flightInfo)
        },5000)
    }
}

    FlightFactory.$inject = ['$http'];

    function FlightFactory($http) {
            return {
                getFlight: function (arrivalCity,departureCity,arrivalDate,departureDate){
                    return $http({
                        method: 'POST',
                        url: '/api/flight',
                        data: {departureCity:departureCity, arrivalCity: arrivalCity}
                    })
                    .success(data=>{
                        return data
                    })
            }

        }
    }


 })();