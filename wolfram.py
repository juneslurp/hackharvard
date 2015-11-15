import wolframalpha
import us
import mechanize
import json
import urllib
import urllib2

app_id = 'GYXL99-Q2HRYVVQRX'
# client = wolframalpha.Client(app_id)

states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Washington-DC", "Delaware", "Florida", "Georgia", 
          "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
          "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New-Hampshire", "New-Jersey", 
          "New-Mexico", "New-York", "North-Carolina", "North-Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode-Island", "South-Carolina", 
          "South-Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West-Virginia", "Wisconsin", "Wyoming"]

hospitals = []
incomes = []

class Wolfram:
	def __init__(self):
		self.br = mechanize.Browser()
		self.br.set_handle_robots(False)
		self.base = 'http://www.ushospital.info/'
		self.br.open(self.base)

	def AccessState(self, i):
		name = states[i]
		url = self.base + name + ".htm"
		self.br.open(url)
		html = self.br.response().read()
		nums = html.split('<li>')[1:]

		for num in nums:
			name = str(self.GetHospitalName(num))
			self.HospitalQuery(name)
			# print len(hospitals)

	def GetHospitalName(self,html):
		num1 = html.find('<a href') 
		numStart = html.find('">', num1) + len('">')
		numEnd = html.find('</a>', numStart)
		return html[numStart:numEnd].strip()

	def HospitalQuery(self, query):
		url = 'http://api.wolframalpha.com/v2/query?appid=GYXL99-Q2HRYVVQRX&input=' + urllib.quote(query) + '&format=plaintext'
		html = urllib2.urlopen(url).read()
		if "<queryresult success='true'" in html:
			
			if "<pod title='Input interpretation'" in html and "<pod title='Location'" in html: 
				num1 = html.find("<pod title='Input interpretation'")
				numStart = html.find('<plaintext>', num1) + len('<plaintext>')
				numEnd = html.find('</plaintext>', numStart)
				name = html[numStart:numEnd].strip()

				num1 = html.find("<pod title='Location'")		
				numStart = html.find('<plaintext>', num1) + len('<plaintext>')
				numEnd = html.find('</plaintext>', numStart)
				location = html[numStart:numEnd].strip()

				a_dict = {'name': name, 'location': location}
				hospitals.append(a_dict)
				# print hospitals
				with open('hospitals.json', 'w') as f:
					json.dump(hospitals, f)

				# print 'success'
				print len(hospitals)

		else:
			# print 'fail'
			print len(hospitals)
			
	def SocioEconomicQuery(self, query):
	 	url = 'http://api.wolframalpha.com/v2/query?appid=GYXL99-Q2HRYVVQRX&input=' + urllib.quote(query) + '&format=plaintext'
		html = urllib2.urlopen(url).read()
		if "<queryresult success='true'" in html:
			if "<pod title='County'" in html:
				num1 = html.find("<pod title='County'")
				numStart = html.find('<plaintext>', num1) + len('<plaintext>')
				numEnd = html.find('</plaintext>', numStart)
				county = html[numStart:numEnd].strip()

				if "<pod title='Income statistics'" in html: 
					num1 = html.find("<pod title='Income statistics'")		
					numStart = html.find('<plaintext>', num1) + len('<plaintext>')
					numEnd = html.find('</plaintext>', numStart)
					income = html[numStart:numEnd].strip()

				else:
					url = 'http://api.wolframalpha.com/v2/query?appid=GYXL99-Q2HRYVVQRX&input=' + urllib.quote(county) + '&format=plaintext'
					html = urllib2.urlopen(url).read()
					if "<pod title='Income statistics'" in html: 
						num1 = html.find("<pod title='Income statistics'")		
						numStart = html.find('<plaintext>', num1) + len('<plaintext>')
						numEnd = html.find('</plaintext>', numStart)
						income = html[numStart:numEnd].strip()

				a_dict = {'county': county, 'location': income}
				incomes.append(a_dict)
				print incomes
				with open('incomes.json', 'w') as f:
					json.dump(incomes, f)

				# print 'success'
				print len(incomes)

		else:
			# print 'fail'
			print len(incomes)

if __name__ == '__main__':
	wolfram = Wolfram()

	# for i in range(0,50):
	# 	wolfram.AccessState(i)
	# 	print ('finished state')

	cities = []

	with open('hospitals.json') as data_file:    
    	data = json.load(data_file)

    for i in data:
    	city = data[i]['location']
    	print city
    	cities.append(city)

    for j in cities:
		self.SocioEconomicQuery(cities[j])

	# print hospitals
	print ('done!')

