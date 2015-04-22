<soap:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Header>
    <passport xmlns="urn:messages_{{ $version }}.platform.webservices.netsuite.com">
      <email xmlns="urn:core_{{ $version }}.platform.webservices.netsuite.com">sWS_User</email>
      <password xmlns="urn:core_{{ $version }}.platform.webservices.netsuite.com">sWS_Pw</password>
      <account xmlns="urn:core_{{ $version }}.platform.webservices.netsuite.com">sWS_Acct</account>
      <role internalId="sWS_Role" xmlns="urn:core_{{ $version }}.platform.webservices.netsuite.com"/>
    </passport>
    <preferences xmlns="urn:messages_{{ $version }}.platform.webservices.netsuite.com">
      <warningAsError>false</warningAsError>
    </preferences>
  </soap:Header>
  <soap:Body>
    <getConsolidatedExchangeRate>
      <consolidatedExchangeRateFilter>
        <period internalId="period_id" />
        <toSubsidiary internalId="1" />
      </consolidatedExchangeRateFilter>
     </getConsolidatedExchangeRate>
  </soap:Body>
</soap:Envelope>
