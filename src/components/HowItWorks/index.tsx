import SectionTitle from "../Common/SectionTitle";

const HowItWorks = () => {
  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <SectionTitle title="How MML Works" paragraph="" center mb="40px" />
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="mb-12 w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp max-w-[500px]" data-wow-delay=".2s">
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    HTML and Javascript are run on a server
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    The document can run scripts, communicate with external services, and listen for
                    events from users.
                  </p>
                </div>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Clients connect to the server using WebSockets
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    The clients receive the initial state on connecting and then get updates as the
                    document changes.
                  </p>
                </div>
                <div className="mb-1">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Clients can interact with the document
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    The clients can send events to the server when they interact with an element in
                    the document, and the server can respond by changing the document for all to
                    see.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <img
                  src="/images/how-mml-works/how-mml-works-image.svg"
                  alt="How MML Works"
                  className="mx-auto max-w-full lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
